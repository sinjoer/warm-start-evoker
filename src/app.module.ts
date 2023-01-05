import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './task/task.module';

@Module({
  imports: [ScheduleModule.forRoot(), TaskModule],
})
export class AppModule {}
