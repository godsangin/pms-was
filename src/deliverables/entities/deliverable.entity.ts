import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Stage } from '../../stages/entities/stage.entity';

@Entity('deliverables')
export class Deliverable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string; // DOC, CODE, etc.

  @Column({ nullable: true })
  fileUrl: string;

  @Column({ default: 'PENDING' })
  status: string;

  @ManyToOne(() => Stage, (stage) => stage.deliverables)
  stage: Stage;
}
