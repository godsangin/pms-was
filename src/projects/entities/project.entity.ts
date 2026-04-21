import { Entity, Column, PrimaryColumn, OneToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SoftwareProject } from './software-project.entity';
import { Stage } from '../../stages/entities/stage.entity';
import { Task } from './task.entity';

@Entity('projects')
export class Project {
  @PrimaryColumn()
  @ApiProperty({ example: 'P-2026' })
  id: string;

  @Column({ type: 'jsonb' })
  name: any;

  @Column({ type: 'jsonb', nullable: true })
  description: any;

  @Column({ nullable: true })
  pmName: string;

  @Column({ default: 'PLANNING' })
  lifecycleStatus: string;

  @Column({ default: 'GREEN' })
  status: string; // Status Signal

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  svThisWeek: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  deliverableApprovalRate: number;

  @Column({ default: 0 })
  criticalTaskCount: number;

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
