import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { StagesModule } from './stages/stages.module';
import { DeliverablesModule } from './deliverables/deliverables.module';
import { Project } from './projects/entities/project.entity';
import { SoftwareProject } from './projects/entities/software-project.entity';
import { Task } from './projects/entities/task.entity';
import { Risk } from './projects/entities/risk.entity';
import { Stage } from './stages/entities/stage.entity';
import { Deliverable } from './deliverables/entities/deliverable.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'pms',
      entities: [Project, SoftwareProject, Task, Risk, Stage, Deliverable],
      synchronize: true,
    }),
    ProjectsModule,
    StagesModule,
    DeliverablesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
