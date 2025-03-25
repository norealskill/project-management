import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from '../prisma.service';
import { AppService } from './app.service';
import { UsersService } from '../services/user.service';
import { TasksService } from '../services/task.service';
import { ProjectsService } from '../services/project.service';
import { ProjectController } from '../controllers/project.controller';
import { UserController } from '../controllers/user.controller';

@Module({
  imports: [],
  controllers: [AppController, ProjectController, UserController],
  providers: [
    AppService,
    PrismaService,
    UsersService,
    TasksService,
    ProjectsService,
  ],
})
export class AppModule {}
