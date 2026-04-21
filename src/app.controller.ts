import { Controller, Get, Query } from '@nestjs/common';
import { ProjectsService } from './projects/projects.service';

@Controller()
export class AppController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('dashboard')
  getDashboard(@Query('lang') lang: string = 'ko') {
    return this.projectsService.getDashboard(lang);
  }
}
