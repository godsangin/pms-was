import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { SoftwareProject } from './entities/software-project.entity';
import { Task } from './entities/task.entity';
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
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectsRepository.create(createProjectDto);
    const savedProject = await this.projectsRepository.save(project);
    
    if (createProjectDto.softwareProject) {
      const software = this.softwareRepository.create({
        ...createProjectDto.softwareProject,
        projectId: savedProject.id,
      });
      await this.softwareRepository.save(software);
    }
    
    return this.findOne(savedProject.id);
  }

  findAll() {
    return this.projectsRepository.find({
      relations: ['softwareProject', 'stages', 'tasks'],
    });
  }

  async findOne(id: string) {
    const project = await this.projectsRepository.findOne({
      where: { id },
      relations: ['softwareProject', 'stages', 'tasks'],
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async getTasks(projectId: string) {
    const tasks = await this.tasksRepository.find({
      where: { projectId },
      order: { wbsCode: 'ASC' },
    });
    return tasks;
  }

  /**
   * WBS 정책에 따라 프로젝트 전체 진척도를 산출합니다.
   * 정책: (각 태스크 진척도 * 가중치)의 합계
   */
  async calculateProjectProgress(projectId: string): Promise<number> {
    const tasks = await this.getTasks(projectId);
    if (tasks.length === 0) return 0;

    // Depth 0 또는 Depth 1 등 최상위 레벨에서의 합산 로직
    // 여기서는 leaf node(더 이상 자식이 없는 노드)의 구성을 전체 프로젝트에 합산하는 로직을 적용합니다.
    return tasks.reduce((acc, task) => {
      // CSV의 '구성진행비율' 정책에 따라 이미 가중치가 적용된 값을 합산하거나,
      // 여기서 실시간으로 가중치 연산을 수행합니다.
      return acc + (Number(task.progressPct) * Number(task.weight)) / 100;
    }, 0);
  }

  async update(id: string, updateData: Partial<CreateProjectDto>) {
    await this.projectsRepository.update(id, {
      name: updateData.name,
      startDate: updateData.startDate,
      endDate: updateData.endDate,
    });
    
    if (updateData.softwareProject) {
      await this.softwareRepository.update(id, updateData.softwareProject);
    }
    
    return this.findOne(id);
  }
}
