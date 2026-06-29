import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { ROUTE_MAP, PROTECTED_PREFIXES } from './route-map';

interface ProxyResult {
  status: number;
  data: unknown;
}

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private extractUser(
    req: Request,
  ): { id: string; email: string; isAdmin: boolean } | null {
    const auth = req.headers['authorization'];
    if (!auth?.startsWith('Bearer ')) return null;
    const token = auth.slice(7);
    try {
      const payload = this.jwtService.verify<{
        sub: string;
        email: string;
        isAdmin: boolean;
      }>(token, {
        secret:
          this.configService.get<string>('JWT_ACCESS_SECRET') ??
          'roomate_access_secret_dev',
      });
      return {
        id: payload.sub,
        email: payload.email,
        isAdmin: payload.isAdmin,
      };
    } catch {
      return null;
    }
  }

  async forward(req: Request): Promise<ProxyResult | null> {
    const start = Date.now();
    const pathAfterApi = req.originalUrl.replace(/^\/api\//, '');
    const [prefix] = pathAfterApi.split('/')[0].split('?');
    const route = ROUTE_MAP.find((r) => r.prefix === prefix);

    if (!route) return null;

    // Auth check for protected routes
    const isProtected = PROTECTED_PREFIXES.includes(prefix);
    const user = this.extractUser(req);

    if (isProtected && !user) {
      return {
        status: 401,
        data: { message: 'Unauthorized', statusCode: 401 },
      };
    }

    const baseUrl = this.configService.get<string>(route.serviceUrlEnvKey);
    const targetUrl = `${baseUrl}/api/${pathAfterApi}`;
    const contentType = (req.headers['content-type'] as string) ?? '';
    const isMultipart = contentType.includes('multipart/form-data');
    const requestData: unknown = isMultipart ? req : (req.body as unknown);

    // Build forwarded headers
    const forwardedHeaders: Record<string, string | undefined> = {
      ...(req.headers as Record<string, string>),
      host: undefined,
      'content-length': undefined,
    };

    // Inject user info as headers so services don't need JWT validation
    if (user) {
      forwardedHeaders['x-user-id'] = user.id;
      forwardedHeaders['x-user-email'] = user.email;
      forwardedHeaders['x-user-is-admin'] = String(user.isAdmin);
    }

    try {
      const response: AxiosResponse<unknown> = await firstValueFrom(
        this.httpService.request<unknown>({
          method: req.method,
          url: targetUrl,
          data: requestData,
          headers: forwardedHeaders,
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        }),
      );

      const duration = Date.now() - start;
      this.logger.log(
        `${req.method} ${req.originalUrl} → ${response.status} (${duration}ms)`,
      );

      return { status: response.status, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      const duration = Date.now() - start;

      if (axiosError.response) {
        this.logger.warn(
          `${req.method} ${req.originalUrl} → ${axiosError.response.status} (${duration}ms)`,
        );
        return {
          status: axiosError.response.status,
          data: axiosError.response.data,
        };
      }

      this.logger.error(
        `${req.method} ${req.originalUrl} → 503 (${duration}ms)`,
      );
      return {
        status: 503,
        data: { message: 'Service unavailable', statusCode: 503 },
      };
    }
  }
}
