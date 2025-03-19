import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { YapeTransactionMsModule } from './yape-transaction-ms.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    YapeTransactionMsModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
        },
        consumer: {
          groupId: 'transaction-consumer',
        },
      },
    },
  );

  await app.listen();
  console.log('🚀 Transaction Microservice is running!');
}

bootstrap();
