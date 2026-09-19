import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './tasks.types.js';
import type { CreateTaskDto } from './dto/create-task.dto.js';
import type { GetTaskFilterDto } from './dto/get-task-filter.dto.js';
import { Task } from './task.entity.js';
import { TasksRepository } from './tasks.repository.js';

@Injectable()
export class TasksService {

  constructor(
    private readonly tasksRepository: TasksRepository) {}

  async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string) : Promise<Task> {
    const foundTask = await this.tasksRepository.findOne({ where: { id } });
    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
