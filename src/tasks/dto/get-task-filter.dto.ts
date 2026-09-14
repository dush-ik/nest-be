import { TaskStatus } from "../task.model.js";

export class GetTaskFilterDto {
  status?: TaskStatus;
  search?: string;
}