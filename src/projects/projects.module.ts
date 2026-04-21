import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { SoftwareProject } from './entities/software-project.entity';
import { Task } from './entities/task.entity';
import { Risk } from './entities/risk.entity';
import { Deliverable } from '../deliverables/entities/deliverable.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, SoftwareProject, Task, Risk, Deliverable])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
