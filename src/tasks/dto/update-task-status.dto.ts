import { TaskStatus } from '../task.status';
import { IsEnum } from 'class-validator';

export class UpdateTaskStatusDTO {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
