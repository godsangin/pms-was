import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Project } from '../../projects/entities/project.entity';
import { Deliverable } from '../../deliverables/entities/deliverable.entity';

@Entity('stages')
export class Stage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // 분석, 설계, 개발, 테스트 등

  @Column({ type: 'int' })
  order: number;

  @Column({ type: 'float', default: 0 })
  weight: number; // 전체 프로젝트 내 비중 (e.g. 개발=0.5)

  @Column({ type: 'float', default: 0 })
  plannedProgress: number; // Baseline 기준 계획 진척률 (%)

  @Column({ type: 'float', default: 0 })
  actualProgress: number; // 실적 진척률 (%)

  @ManyToOne(() => Project, (project) => project.stages)
  project: Project;

  @OneToMany(() => Deliverable, (deliverable) => deliverable.stage)
  deliverables: Deliverable[];
}
