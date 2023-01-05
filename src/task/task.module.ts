import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { TaskService } from './task.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  providers: [TaskService],
})
export class TaskModule {}
