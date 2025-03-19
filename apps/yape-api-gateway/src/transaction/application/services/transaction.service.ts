import { TransactionsPorts } from '@apiGateway/domain/repositories/transaction.ports';
import { TransactionProducer } from '@apiGateway/infrastructure/messaging/kafka.producer';
import { CreateTransactionDto } from '@apiGateway/interface/dtos/create-transaction.dto';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TransactionProducer)
    private readonly transactionsPorts: TransactionsPorts,
  ) {}

  async createTransaction(transaction: CreateTransactionDto): Promise<void> {
    console.log('🚀 Procesando transacción en el servicio:');
    await this.transactionsPorts.publishTransactionCreated(transaction);
  }
}
