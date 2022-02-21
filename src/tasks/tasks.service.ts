import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task.status';
import { v4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksRespository } from './tasks.repository';
import { Task } from './task.entity';
import { GetTasksFilterDTO } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRespository)
    private tasksRepository: TasksRespository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ id });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO);
  }

  async deleteTaskById(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException();
    }
  }

  async updateStatusById(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  async getTasks(getTaskFilterDTO: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksRepository.getTasks(getTaskFilterDTO);
  }
}
