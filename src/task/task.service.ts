import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllTasks(userId: number): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: { userId },
    });
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const { name, dueDate, description, userId } = dto;
    return await this.prisma.task.create({
      data: {
        name,
        dueDate,
        description,
        userId,
      },
    });
  }

  async updateTask(dto: UpdateTaskDto): Promise<Task> {
    const { id, name, dueDate, status, description } = dto;
    return await this.prisma.task.update({
      where: { id },
      data: {
        name,
        dueDate,
        status,
        description,
      },
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return await this.prisma.task.delete({ where: { id } });
  }
}
