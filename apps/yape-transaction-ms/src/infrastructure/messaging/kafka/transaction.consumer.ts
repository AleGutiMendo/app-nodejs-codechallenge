import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class TransactionConsumer implements OnModuleInit {
  private readonly logger = new Logger(TransactionConsumer.name);

  constructor(
    @Inject('KAFKA_CONSUMER') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.logger.log('Initializing TransactionConsumer...');
    await this.kafkaClient.connect();
    this.logger.log('Kafka client connected successfully.');
  }
}
