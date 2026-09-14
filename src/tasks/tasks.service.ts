import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model.js';
import { v4 as uuid } from 'uuid';
import type { CreateTaskDto } from './dto/create-task.dto.js';
import type { GetTaskFilterDto } from './dto/get-task-filter.dto.js';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters (filterDto: GetTaskFilterDto): Task [] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => 
        task.title.includes(search) || task.description.includes(search)
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task | undefined {
    const foundTask =  this.tasks.find(task => task.id === id);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return foundTask;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task | undefined {
    const task = this.getTaskById(id);
    if (task) {
      task.status = status;
    }
    return task;
  }
}
