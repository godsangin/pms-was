import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsDateString } from 'class-validator';

export class CreateSoftwareProjectDto {
  @ApiProperty({ example: ['React', 'NestJS'] })
  @IsArray()
  techStack: string[];

  @ApiProperty({ example: 'https://github.com/repo' })
  @IsString()
  gitRepoUrl: string;

  @ApiProperty({ example: 'Microservices' })
  @IsString()
  architectureType: string;
}

export class CreateProjectDto {
  @ApiProperty({ example: '신규 시스템 구축' })
  @IsString()
  name: string;

  @ApiProperty({ example: '프로젝트 설명' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2024-04-20' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-12-31' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ type: CreateSoftwareProjectDto })
  softwareProject: CreateSoftwareProjectDto;
}
