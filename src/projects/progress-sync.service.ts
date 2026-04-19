import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from '../stages/entities/stage.entity';
import { Deliverable } from '../deliverables/entities/deliverable.entity';

@Injectable()
export class ProgressSyncService {
  constructor(
    @InjectRepository(Stage) private stageRepo: Repository<Stage>,
    @InjectRepository(Deliverable) private deliverableRepo: Repository<Deliverable>
  ) {}

  // 분석/설계 단계 연동 로직: 산출물 완료 건수 / 전체 산출물 건수
  async syncAnalysisDesignProgress(stageId: string) {
    const deliverables = await this.deliverableRepo.find({ where: { stage: { id: stageId } } });
    if (deliverables.length === 0) return;

    const completed = deliverables.filter(d => d.status === 'APPROVED').length;
    const progress = (completed / deliverables.length) * 100;
    
    await this.stageRepo.update(stageId, { actualProgress: progress });
  }

  // 개발 단계 연동 로직 (가상): 프로그램별 진척률 가중 평균
  async syncDevelopmentProgress(stageId: string, programs: any[]) {
    if (programs.length === 0) return;
    
    const totalProgress = programs.reduce((acc, p) => acc + p.progressPct, 0);
    const progress = totalProgress / programs.length;

    await this.stageRepo.update(stageId, { actualProgress: progress });
  }
}
