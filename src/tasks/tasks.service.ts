import { Injectable, NotFoundException } from '@nestjs/common';
import {  TaskStatus } from './tasks.types.js';
import type { CreateTaskDto } from './dto/create-task.dto.js';
import type { GetTaskFilterDto } from './dto/get-task-filter.dto.js';
import type { User } from '../auth/user.entity.js';
import { Task } from './task.entity.js';
import { TasksRepository } from './tasks.repository.js';

@Injectable()
export class TasksService {

  constructor(
    private readonly tasksRepository: TasksRepository) {}

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    return await this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User) : Promise<Task> {
    const foundTask = await this.tasksRepository.findOne({ where: { id, user } });
    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return foundTask;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
