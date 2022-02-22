import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status';

@EntityRepository(Task)
export class TasksRespository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    const task = this.create({
      title: createTaskDTO.title,
      description: createTaskDTO.description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);

    return task;
  }

  async getTasks(
    getTaskFilterDTO: GetTasksFilterDTO,
    user: User,
  ): Promise<Task[]> {
    const { status } = getTaskFilterDTO;
    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
