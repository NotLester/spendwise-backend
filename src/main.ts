import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ApiKeyAuthGuard } from 'src/auth/guard/apiKey-auth.guard';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security
  app.useGlobalGuards(new ApiKeyAuthGuard());
  app.enableCors();
  app.use(helmet());
  
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // OpenAPI swagger docs
  const config = new DocumentBuilder()
    .setTitle('SpendWise API')
    .setDescription(
      'SpendWise is an API that allows you to organize your data that is easy to use and understand with power of large language models',
    )
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-KEY',
        in: 'header',
        description: "API key for authentication of registered applicants"
      },
      'apiKey',
    )
    .addTag('spend-wise')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
