import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    const url = this.configService.get<string>('TARGET_DOMAIN');
    const { status } = await this.httpService.axiosRef.get(url);
    this.logger.log(`ping ${url} - ${status}`);
  }
}
