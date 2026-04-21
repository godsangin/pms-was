import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('stages')
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @ManyToOne(() => Project, (project) => project.stages)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column({ type: 'jsonb' })
  name: any;

  @Column()
  order: number;

  @Column({ default: 'NOT_STARTED' })
  status: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  progress: number;
}
