import { Controller, Get } from '@nestjs/common';
import { DemoService } from './demo.service';

@Controller()
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get('/hello')
  getHello(): string {
    return this.demoService.getHello();
  }
}
