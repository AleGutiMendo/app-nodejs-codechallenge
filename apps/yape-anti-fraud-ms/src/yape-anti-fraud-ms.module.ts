import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AntiFraudService } from './application/services/anti-fraud.service';
import { AntiFraudConsumer } from './infrastructure/messaging/anti-fraud.consumer';
import { AntiFraudProducer } from './infrastructure/messaging/anti-fraud.producer';
import { AntiFraudController } from './interface/controllers/anti-fraud.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'KAFKA_CONSUMER',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
            retry: {
              initialRetryTime: 3000,
              retries: 10,
            },
          },
          consumer: {
            groupId: 'transaction-consumer',
          },
          serializer: {
            serialize: (value) => Buffer.from(JSON.stringify(value)),
          },
          deserializer: {
            deserialize: (value) => JSON.parse(value.toString()),
          },
        },
      },
      {
        name: 'KAFKA_PRODUCER',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
          },
          producerOnlyMode: true,
        },
      },
    ]),
  ],
  controllers: [AntiFraudController],
  providers: [AntiFraudConsumer, AntiFraudProducer, AntiFraudService],
  exports: [],
})
export class YapeAntiFraudMsModule {}
