import { CreateTransactionDto } from '@apiGateway/interface/dtos/create-transaction.dto';

export interface TransactionsPorts {
  publishTransactionCreated(transaction: CreateTransactionDto): Promise<any>;
}
