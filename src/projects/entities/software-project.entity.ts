import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Project } from './project.entity';

@Entity('software_projects')
export class SoftwareProject {
  @PrimaryColumn()
  projectId: string;

  @OneToOne(() => Project, (project) => project.softwareProject)
  @JoinColumn({ name: 'projectId' })
  project: Project;

  @Column({ type: 'simple-array', nullable: true })
  techStack: string[];

  @Column({ nullable: true })
  gitRepoUrl: string;

  @Column({ nullable: true })
  architectureType: string;

  @Column({ default: 'STABLE' })
  ciCdStatus: string;
}
