import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class AdminHttpService {
  async get<T>(
    url: string,
    token: string,
    params?: Record<string, unknown>,
    userHeaders?: Record<string, string>,
  ): Promise<T> {
    const response = await axios.get<T>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...userHeaders,
      },
      params,
    });
    return response.data;
  }

  async patch<T>(
    url: string,
    token: string,
    data?: unknown,
    userHeaders?: Record<string, string>,
  ): Promise<T> {
    const response = await axios.patch<T>(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...userHeaders,
      },
    });
    return response.data;
  }
}
