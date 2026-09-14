import { IsEnum } from "class-validator";
import { TaskStatus } from "../task.model.js";

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}