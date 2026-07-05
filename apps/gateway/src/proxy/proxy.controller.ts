import { All, Controller, Req, Res, NotFoundException } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @All('*path')
  async forward(@Req() req: Request, @Res() res: Response) {
    const result = await this.proxyService.forward(req);
    if (!result) {
      throw new NotFoundException('No service configured for this route');
    }
    if (result.status >= 300 && result.status < 400 && result.headers?.location) {
      return res.redirect(result.status, result.headers.location);
    }
    res.status(result.status).json(result.data);
  }
}
