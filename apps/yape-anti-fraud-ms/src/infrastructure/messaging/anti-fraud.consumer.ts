import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AntiFraudConsumer implements OnModuleInit {
  private readonly logger = new Logger(AntiFraudConsumer.name);

  constructor(
    @Inject('KAFKA_CONSUMER') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.logger.log('Conectando Kafka...');
    await this.kafkaClient.connect();
    this.logger.log('Kafka conectado y listo para procesar mensajes.');
  }
}
