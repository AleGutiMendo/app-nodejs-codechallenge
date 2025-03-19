import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TransactionEntity } from '@transaction/domain/entities/transaction.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransactionProducer {
  private readonly logger = new Logger(TransactionProducer.name);

  constructor(
    @Inject('KAFKA_PRODUCER') private readonly kafkaClient: ClientKafka,
  ) {}

  async publishTransactionCreated(
    transaction: TransactionEntity,
  ): Promise<boolean> {
    if (!this.kafkaClient) {
      this.logger.error('Kafka Client no está inicializado.');
      return false;
    }

    const payload = { ...transaction };

    this.logger.log(`Enviando mensaje a Kafka: ${JSON.stringify(payload)}`);

    try {
      await firstValueFrom(
        this.kafkaClient.emit('transaction.created', JSON.stringify(payload)),
      );
      this.logger.log(
        `Mensaje enviado a Kafka: transaction.created - ID ${transaction.id}`,
      );
      return true;
    } catch (err) {
      this.logger.error(
        `Error enviando mensaje a Kafka: ${err.message}`,
        err.stack,
      );
      return false;
    }
  }
}
