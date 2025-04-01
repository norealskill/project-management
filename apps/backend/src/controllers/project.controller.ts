import {
  Controller,
  Get,
  Delete,
  Param,
  Body,
  Post,
  Put,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProjectsService } from '../services/project.service';
import { Prisma, Project as ProjectModel } from '@prisma/client';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectsService) {}

  @Get()
  async getProjectsAndTasks(
    @Query('_include') include: string
  ): Promise<ProjectModel[]> {
    if (include === 'tasks') {
      return this.projectService.projects({
        include: {
          tasks: true,
        },
      });
    } else if (include === 'owner') {
      return this.projectService.projects({
        include: {
          owner: true,
        },
      });
    } else if (include === 'all') {
      return this.projectService.projects({
        include: {
          tasks: true,
          owner: true,
        },
      });
    } else if (!include) {
      return this.projectService.projects({});
    }

    throw new BadRequestException('include must be [owner | tasks | all]');
  }

  @Get('/')
  async getProjects(): Promise<ProjectModel[] | null> {
    console.log('base route');
    return this.projectService.projects({});
  }

  @Get('/:id')
  async getProjectById(@Param('id') id: string): Promise<ProjectModel | null> {
    console.log('id route');
    return this.projectService.project({ id: Number(id) });
  }

  @Get('?title=:searchString')
  async searchProjects(
    @Param('searchString') searchString: string
  ): Promise<ProjectModel[]> {
    console.log('search string route');
    return this.projectService.projects({
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
  async createProject(
    @Body() createProject: Prisma.ProjectCreateInput
  ): Promise<ProjectModel> {
    return this.projectService.createProject(createProject);
  }

  @Put('/')
  async updateProject(
    @Body() updateProject: Prisma.ProjectUpdateArgs
  ): Promise<ProjectModel> {
    return this.projectService.updateProject(updateProject);
  }

  @Delete('/:id')
  async deleteProject(@Param('id') id: string): Promise<ProjectModel> {
    return this.projectService.deleteProject({ id: Number(id) });
  }
}
