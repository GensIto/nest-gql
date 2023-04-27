import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';
import { Task as TaskModel } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Resolver(() => TaskModel)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskModel], { nullable: 'items' })
  async findAllTasks(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Task[]> {
    return await this.taskService.findAllTasks(userId);
  }

  @Mutation(() => TaskModel)
  async createTask(@Args('createTaskDto') dto: CreateTaskDto): Promise<Task> {
    return await this.taskService.createTask(dto);
  }

  @Mutation(() => TaskModel)
  async updateTask(@Args('updateTaskDto') dto: UpdateTaskDto): Promise<Task> {
    return await this.taskService.updateTask(dto);
  }

  @Mutation(() => TaskModel)
  async deleteTask(@Args('id', { type: () => Int }) id: number): Promise<Task> {
    return await this.taskService.deleteTask(id);
  }
}
