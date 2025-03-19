import { TransactionService } from '@apiGateway/application/services/transaction.service';
import { TransactionController } from '@apiGateway/interface/controllers/transaction.controller';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionProducer } from '../messaging/kafka.producer';

@Module({
  imports: [
    ClientsModule.register([
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
  controllers: [TransactionController],
  providers: [TransactionService, TransactionProducer],
})
export class TransactionModule {}
