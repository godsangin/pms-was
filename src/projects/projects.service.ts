import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { SoftwareProject } from './entities/software-project.entity';
import { Task } from './entities/task.entity';
import { Risk } from './entities/risk.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(SoftwareProject)
    private softwareRepository: Repository<SoftwareProject>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Risk)
    private risksRepository: Repository<Risk>,
  ) {}

  private localize(data: any, lang: string) {
    if (!data) return data;
    if (typeof data === 'object' && data[lang]) {
      return data[lang];
    }
    return data;
  }

  private mapProject(project: Project, lang: string) {
    return {
      ...project,
      name: this.localize(project.name, lang),
      description: this.localize(project.description, lang),
      // Computed fields for frontend if needed
    };
  }

  async findAll(lang: string = 'ko') {
    const projects = await this.projectsRepository.find({
      relations: ['softwareProject'],
    });
    return projects.map(p => this.mapProject(p, lang));
  }

  async findOne(id: string, lang: string = 'ko') {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['softwareProject', 'tasks', 'stages'],
    });
    if (!project) throw new NotFoundException('Project not found');
    
    const risks = await this.risksRepository.find({ where: { projectId: id } });
    
    return {
      project: this.mapProject(project, lang),
      risks: risks.map(r => ({
        ...r,
        title: this.localize(r.title, lang),
        cause: this.localize(r.cause, lang),
        action: this.localize(r.action, lang),
        expectedImpact: this.localize(r.expectedImpact, lang),
      })),
    };
  }

  async getTasks(projectId: string, lang: string = 'ko') {
    const tasks = await this.tasksRepository.find({
      where: { projectId },
      order: { wbsCode: 'ASC' },
    });
    return tasks.map(t => ({
      ...t,
      name: this.localize(t.name, lang),
    }));
  }

  async getRisks(projectId: string, lang: string = 'ko') {
    const risks = await this.risksRepository.find({ where: { projectId } });
    return risks.map(r => ({
      ...r,
      title: this.localize(r.title, lang),
      cause: this.localize(r.cause, lang),
      action: this.localize(r.action, lang),
      expectedImpact: this.localize(r.expectedImpact, lang),
    }));
  }

  async calculateProjectProgress(projectId: string): Promise<number> {
    const tasks = await this.tasksRepository.find({ where: { projectId } });
    if (tasks.length === 0) return 0;
    return tasks.reduce((acc, task) => {
      return acc + (Number(task.progressPct) * Number(task.weight)) / 100;
    }, 0);
  }

  async getDashboard(lang: string = 'ko') {
    const projects = await this.findAll(lang);
    const topRisks = await this.risksRepository.find({
      order: { targetDate: 'ASC' },
      take: 5,
    });

    return {
      asOfDate: new Date().toISOString(),
      kpis: {
        totalProjects: projects.length,
        inProgressProjects: projects.length, // Simplified
        onTrackPercent: 100, // Computed or static for now
        atRiskProjects: 0,
        criticalTasks: 0,
        deliverableApprovalRate: 100,
        portfolioSvAvg: 0,
      },
      projects,
      topRisks: topRisks.map(r => ({
        ...r,
        title: this.localize(r.title, lang),
        cause: this.localize(r.cause, lang),
        action: this.localize(r.action, lang),
        expectedImpact: this.localize(r.expectedImpact, lang),
      })),
    };
  }
}
