import { Controller, Get, Post, Body, Patch, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deliverable } from '../deliverables/entities/deliverable.entity';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    @InjectRepository(Deliverable)
    private readonly deliverableRepository: Repository<Deliverable>,
  ) {}

  @Post()
  @ApiOperation({ summary: '신규 프로젝트 등록' })
  create(@Body() createProjectDto: CreateProjectDto) {
    // Note: DTO should be updated to handle JSONB name/description
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: '전체 프로젝트 조회' })
  findAll(@Query('lang') lang: string = 'ko') {
    return this.projectsService.findAll(lang);
  }

  @Get(':id')
  @ApiOperation({ summary: '상세 프로젝트 조회' })
  findOne(@Param('id') id: string, @Query('lang') lang: string = 'ko') {
    return this.projectsService.findOne(id, lang);
  }

  @Get(':id/tasks')
  @ApiOperation({ summary: '프로젝트 태스크(WBS) 조회' })
  getTasks(@Param('id') id: string, @Query('lang') lang: string = 'ko') {
    return this.projectsService.getTasks(id, lang);
  }

  @Get(':id/progress')
  @ApiOperation({ summary: '프로젝트 진척도 조회' })
  async getProgress(@Param('id') id: string) {
    const progress = await this.projectsService.calculateProjectProgress(id);
    return [{ week: '현재', planned: 14, actual: progress }];
  }

  @Get(':id/deliverables')
  @ApiOperation({ summary: '프로젝트 산출물 조회' })
  async getDeliverables(@Param('id') id: string, @Query('lang') lang: string = 'ko') {
    const items = await this.deliverableRepository.find({ where: { projectId: id } });
    return items.map(item => ({
      ...item,
      title: typeof item.title === 'object' ? item.title[lang] : item.title,
    }));
  }
}
