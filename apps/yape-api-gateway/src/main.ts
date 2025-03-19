import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { YapeApiGatewayModule } from './yape-api-gateway.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(YapeApiGatewayModule);
  await app.listen(process.env.port ?? 3000);
  logger.log(
    `🚀 Application is running on: http://localhost:${process.env.port ?? 3000}`,
  );
}
bootstrap();
