import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task.status';
import { v4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TasksRespository } from './tasks.repository';
import { Task } from './task.entity';
import { GetTasksFilterDTO } from './dto/task-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRespository)
    private tasksRepository: TasksRespository,
  ) {}

  async getTaskById(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ id, user });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO, user);
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });

    if (!result.affected) {
      throw new NotFoundException();
    }
  }

  async updateStatusById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  async getTasks(
    getTaskFilterDTO: GetTasksFilterDTO,
    user: User,
  ): Promise<Task[]> {
    return this.tasksRepository.getTasks(getTaskFilterDTO, user);
  }
}
