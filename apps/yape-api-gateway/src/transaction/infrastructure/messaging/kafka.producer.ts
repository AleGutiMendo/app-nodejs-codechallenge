import { TransactionsPorts } from '@apiGateway/domain/repositories/transaction.ports';
import { CreateTransactionDto } from '@apiGateway/interface/dtos/create-transaction.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransactionProducer implements TransactionsPorts {
  constructor(
    @Inject('KAFKA_PRODUCER') private readonly kafkaClient: ClientKafka,
  ) {}

  async publishTransactionCreated(
    transaction: CreateTransactionDto,
  ): Promise<void> {
    console.log(
      '📤 Enviando evento a transaction.request.create:',
      transaction,
    );
    await firstValueFrom(
      this.kafkaClient.emit('transaction.request.create', {
        key: 'transaction',
        value: transaction,
      }),
    );
  }
}
