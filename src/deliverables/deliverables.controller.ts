import { Controller, Post, UseInterceptors, UploadedFile, Param, Patch, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('deliverables')
@Controller('deliverables')
export class DeliverablesController {
  
  @Post(':id/upload')
  @ApiOperation({ summary: '산출물 파일 업로드' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    // 실제 환경에서는 S3나 File Storage에 저장 후 URL 반환
    return {
      id,
      fileName: file.originalname,
      url: `/uploads/${file.originalname}`,
      status: 'UPLOADED'
    };
  }
}
