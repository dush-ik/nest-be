import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import type { User } from '../auth/user.entity.js';
import { TaskStatus } from './tasks.types.js';
import { GetTaskFilterDto } from './dto/get-task-filter.dto.js';

@Injectable()
export class TasksRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks (filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const query = this.createQueryBuilder('task')
    query.where({ user });
    const { status, search } = filterDto;
    if (status) {
      query.andWhere('task.status = :status', { status: status.toLowerCase() });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search.toLowerCase()}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    await this.save(task);
    return task;
  }
}
