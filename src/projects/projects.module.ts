import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { SoftwareProject } from './entities/software-project.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, SoftwareProject, Task])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
