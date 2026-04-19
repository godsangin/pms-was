import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  wbsCode: string;

  @Column()
  depth: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  weight: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progressPct: number;

  @Column({ type: 'date' })
  baselineStart: Date;

  @Column({ type: 'date' })
  baselineEnd: Date;

  @Column({ type: 'date', nullable: true })
  actualStart: Date;

  @Column({ type: 'date', nullable: true })
  actualEnd: Date;
}
