import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks.types.js";

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}