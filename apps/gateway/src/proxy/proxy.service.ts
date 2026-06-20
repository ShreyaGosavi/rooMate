import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import type { Request } from 'express';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
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
    const pathAfterApi = req.originalUrl.replace(/^\/api\//, '');
    const [prefix] = pathAfterApi.split('/');
    const route = ROUTE_MAP.find((r) => r.prefix === prefix);

    if (!route) return null;

    const baseUrl = this.configService.get<string>(route.serviceUrlEnvKey);
    const targetUrl = `${baseUrl}/api/${pathAfterApi}`;

    const contentType = req.headers['content-type'] ?? '';
    const isMultipart = contentType.includes('multipart/form-data');

    try {
      const response = await firstValueFrom(
        this.httpService.request({
          method: req.method,
          url: targetUrl,
          data: isMultipart ? req : req.body,
          headers: {
            ...req.headers,
            host: undefined,
            'content-length': undefined,
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
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
