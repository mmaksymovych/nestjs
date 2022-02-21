import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/task-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status';

@EntityRepository(Task)
export class TasksRespository extends Repository<Task> {
  async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    const task = this.create({
      title: createTaskDTO.title,
      description: createTaskDTO.description,
      status: TaskStatus.OPEN,
    });
    await this.save(task);

    return task;
  }

  async getTasks(getTaskFilterDTO: GetTasksFilterDTO): Promise<Task[]> {
    const { status } = getTaskFilterDTO;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
