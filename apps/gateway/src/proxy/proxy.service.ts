import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import type { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { ROUTE_MAP } from './route-map';

interface ProxyResult {
  status: number;
  data: unknown;
}

@Injectable()
export class ProxyService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async forward(req: Request): Promise<ProxyResult | null> {
    // req.originalUrl includes the global prefix, e.g. /api/auth/signup
    const pathAfterApi = req.originalUrl.replace(/^\/api\//, '');
    const [prefix] = pathAfterApi.split('/');

    const route = ROUTE_MAP.find((r) => r.prefix === prefix);
    if (!route) {
      return null;
    }

    const baseUrl = this.configService.get<string>(route.serviceUrlEnvKey);
    const targetUrl = `${baseUrl}/api/${pathAfterApi}`;

    try {
      const response: AxiosResponse<unknown> = await firstValueFrom(
        this.httpService.request<unknown>({
          method: req.method,
          url: targetUrl,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: req.body,
          headers: {
            ...req.headers,
            host: undefined,
            'content-length': undefined,
          },
        }),
      );
      return { status: response.status, data: response.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        return {
          status: axiosError.response.status,
          data: axiosError.response.data,
        };
      }
      return {
        status: 503,
        data: { message: 'Service unavailable' },
      };
    }
  }
}
