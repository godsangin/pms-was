import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, IsDateString, IsObject } from 'class-validator';

export class CreateSoftwareProjectDto {
  @ApiProperty({ example: ['React', 'NestJS'] })
  @IsArray()
  @IsOptional()
  techStack?: string[];

  @ApiProperty({ example: 'https://github.com/repo' })
  @IsString()
  @IsOptional()
  gitRepoUrl?: string;

  @ApiProperty({ example: 'Microservices' })
  @IsString()
  @IsOptional()
  architectureType?: string;
}

export class CreateProjectDto {
  @ApiProperty({ example: 'P-2026' })
  @IsString()
  id: string;

  @ApiProperty({ example: { ko: '프로젝트명', en: 'Project Name' } })
  @IsObject()
  name: any;

  @ApiProperty({ example: { ko: '설명', en: 'Description' } })
  @IsOptional()
  @IsObject()
  description?: any;

  @ApiProperty({ example: 'Hong Gil Dong' })
  @IsOptional()
  @IsString()
  pmName?: string;

  @ApiProperty({ example: '2024-04-20' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-12-31' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ type: CreateSoftwareProjectDto, required: false })
  @IsOptional()
  softwareProject?: CreateSoftwareProjectDto;
}
