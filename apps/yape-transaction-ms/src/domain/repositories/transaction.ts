import {
  TransactionEntity,
  TransactionStatus,
} from '../entities/transaction.entity';

export interface TransactionPorts {
  create(transaction: Partial<TransactionEntity>): Promise<TransactionEntity>;
  findById(id: string): Promise<TransactionEntity | null>;
  updateStatus(id: string, status: TransactionStatus): Promise<void>;
}
