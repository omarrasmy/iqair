import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function initSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('iqair API')
    .setDescription("An API Documentation for yassir That Describe our API's")
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      withCredentials: true,
    },
  };

  SwaggerModule.setup('iqair-swagger-docs', app, document, customOptions);
}
