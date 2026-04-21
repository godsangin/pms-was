import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  wbsCode: string;

  @Column()
  depth: number;

  @Column({ type: 'jsonb' })
  name: any;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  weight: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progressPct: number;

  @Column({ type: 'date', nullable: true })
  baselineStart: Date;

  @Column({ type: 'date', nullable: true })
  baselineEnd: Date;

  @Column({ type: 'date', nullable: true })
  actualStart: Date;

  @Column({ type: 'date', nullable: true })
  actualEnd: Date;
}
