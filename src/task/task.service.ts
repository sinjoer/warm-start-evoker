import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  // RUN EVERY 2 MINUTES
  @Cron('*/2 * * * *')
  async handleCron() {
    const url = this.configService.get<string>('TARGET_DOMAIN');
    const { status } = await this.httpService.axiosRef.get(url);
    this.logger.log(`ping ${url} - ${status}`);
  }
}
