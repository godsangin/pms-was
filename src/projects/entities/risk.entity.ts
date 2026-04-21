import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('risks')
export class Risk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column()
  severity: string;

  @Column({ default: 'OPEN' })
  status: string;

  @Column({ type: 'jsonb' })
  title: any;

  @Column({ nullable: true })
  owner: string;

  @Column({ type: 'jsonb', nullable: true })
  cause: any;

  @Column({ type: 'jsonb', nullable: true })
  action: any;

  @Column({ type: 'jsonb', nullable: true })
  expectedImpact: any;

  @Column({ type: 'date', nullable: true })
  targetDate: Date;
}
