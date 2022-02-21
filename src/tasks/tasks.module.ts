import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRespository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRespository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
