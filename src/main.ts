import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Executive PMS API')
    .setDescription('소프트웨어 구축 프로젝트 관리 시스템 API 명세서')
    .setVersion('1.0')
    .addTag('projects')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation is available at: ${await app.getUrl()}/api-docs`);
}
bootstrap();
