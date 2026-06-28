import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AdminHttpService {
  constructor(private readonly httpService: HttpService) {}

  async get<T>(
    url: string,
    token: string,
    params?: Record<string, unknown>,
    userHeaders?: Record<string, string>,
  ): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.get<T>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...userHeaders,
        },
        params,
      }),
    );
    return response.data;
  }

  async patch<T>(
    url: string,
    token: string,
    data?: unknown,
    userHeaders?: Record<string, string>,
  ): Promise<T> {
    const response = await firstValueFrom(
      this.httpService.patch<T>(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          ...userHeaders,
        },
      }),
    );
    return response.data;
  }
}
