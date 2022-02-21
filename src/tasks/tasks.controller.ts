import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Console } from 'console';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/task-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() getTasksFilterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksService.getTasks(getTasksFilterDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Promise<Task> {
    return this.tasksService.updateStatusById(id, updateTaskStatusDTO.status);
  }
}
