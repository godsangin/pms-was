import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: '신규 프로젝트 등록' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: '전체 프로젝트 조회' })
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '상세 프로젝트 조회' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Get(':id/tasks')
  @ApiOperation({ summary: '프로젝트 태스크(WBS) 조회' })
  getTasks(@Param('id') id: string) {
    return this.projectsService.getTasks(id);
  }

  @Get(':id/progress')
  @ApiOperation({ summary: '프로젝트 진척도(WBS 기반 합산) 조회' })
  async getProgress(@Param('id') id: string) {
    const progress = await this.projectsService.calculateProjectProgress(id);
    // 차트용 더미 히스토리를 포함하여 반환하거나 실시간 계산값을 반환
    return [{ week: '현재', planned: 14, actual: progress }];
  }

  @Patch(':id')
  @ApiOperation({ summary: '프로젝트 정보 수정' })
  update(@Param('id') id: string, @Body() updateData: Partial<CreateProjectDto>) {
    return this.projectsService.update(id, updateData);
  }
}
