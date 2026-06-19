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
    res.status(result.status).json(result.data);
  }
}
