import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTransactionHandler } from '@transaction/application/commands/create-transaction.command';
import { UpdateTransactionStatusHandler } from '@transaction/application/commands/update-transaction.command';
import { TransactionEntity } from '@transaction/domain/entities/transaction.entity';
import { TransactionConsumer } from '@transaction/infrastructure/messaging/kafka/transaction.consumer';
import { TransactionProducer } from '@transaction/infrastructure/messaging/kafka/transaction.producer';
import { TransactionRepository } from '@transaction/infrastructure/repositories/transaction.repository';
import { TransactionController } from './interface/controllers/transaction.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || 'postgres',
      database: process.env.DB_NAME || 'transactions',
      entities: [TransactionEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([TransactionEntity]),
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
  providers: [
    TransactionRepository,
    TransactionProducer,
    TransactionConsumer,
    CreateTransactionHandler,
    UpdateTransactionStatusHandler,
  ],
  controllers: [TransactionController],
  exports: [TransactionRepository, TransactionProducer],
})
export class YapeTransactionMsModule {}
