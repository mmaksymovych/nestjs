import { IsOptional } from 'class-validator';

export class GetTasksFilterDTO {
  @IsOptional()
  status?: string;
}
