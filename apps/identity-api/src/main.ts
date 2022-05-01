import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AUTH_FEATURE } from './app/auth/auth.config';
import { ZKP_FEATURE } from './app/zkp/zkp.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalVersion = '1';
  const globalPrefix = `api/v${globalVersion}`;
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;
  const config = new DocumentBuilder()
    .setTitle('Government Identity Management API')
    .setDescription('An API to manage and generate proofs of identity')
    .setVersion(globalVersion)
    .addTag(AUTH_FEATURE.name)
    .addTag(ZKP_FEATURE.name)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document);
  await app.listen(port);
  Logger.log(`Listening at http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
