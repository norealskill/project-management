import {
  Controller,
  Get,
  Delete,
  Param,
  Body,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from '../services/project.service';
import { Prisma, Project as ProjectModel } from '@prisma/client';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectsService) {}
  @Get('/')
  async getProjects(): Promise<ProjectModel[] | null> {
    return this.projectService.projects({});
  }

  @Get('/:id')
  async getProjectById(@Param('id') id: string): Promise<ProjectModel | null> {
    return this.projectService.project({ id: Number(id) });
  }

  @Get('?title=:searchString')
  async searchProjects(
    @Param('searchString') searchString: string
  ): Promise<ProjectModel[]> {
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
