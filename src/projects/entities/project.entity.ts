import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SoftwareProject } from './software-project.entity';
import { Stage } from '../../stages/entities/stage.entity';
import { Task } from './task.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @OneToOne(() => SoftwareProject, (software) => software.project, { cascade: true })
  softwareProject: SoftwareProject;

  @OneToMany(() => Stage, (stage) => stage.project)
  stages: Stage[];

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
