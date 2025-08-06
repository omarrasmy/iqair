import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import './cofig'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { QueryFailedExceptionFilter } from './database/exception.filter';
import * as morgan from 'morgan';
import { initSwagger } from './swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { credentials: true },
  });
  app.use(morgan("dev"));
  app.enableCors({
    // origin: process.env.ORIGINS,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true, whitelist: true, transformOptions: {
      enableImplicitConversion: true,
    }
  }));

  // use global interceptor (to make ToArray works)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // we use this for custom validation app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalFilters(new QueryFailedExceptionFilter());

  initSwagger(app);
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter.getInstance()));
  await app.listen(process.env.SERVER_PORT || 8080);
}
bootstrap();
