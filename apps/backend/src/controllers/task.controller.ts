import { Controller, Get, Delete, Param, Body, Post } from '@nestjs/common';
import { TasksService } from '../services/task.service';
import { Prisma, Task as TaskModel } from '@prisma/client';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TasksService) {}
  @Get('/')
  async getProjects(): Promise<TaskModel[] | null> {
    return this.taskService.tasks({});
  }

  @Get('/:id')
  async getProjectById(@Param('id') id: string): Promise<TaskModel | null> {
    return this.taskService.task({ id: Number(id) });
  }

  @Get('?title=:searchString')
  async searchProjects(
    @Param('searchString') searchString: string
  ): Promise<TaskModel[]> {
    return this.taskService.tasks({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('/')
  async createTask(
    @Body() createTask: Prisma.TaskCreateInput
  ): Promise<TaskModel> {
    return this.taskService.createTask(createTask);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<TaskModel> {
    return this.taskService.deleteTask({ id: Number(id) });
  }
}
