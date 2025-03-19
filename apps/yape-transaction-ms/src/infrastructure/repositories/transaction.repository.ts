import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  TransactionEntity,
  TransactionStatus,
} from '@transaction/domain/entities/transaction.entity';
import { TransactionPorts } from '@transaction/domain/repositories/transaction';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionRepository implements TransactionPorts {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<TransactionEntity>,
  ) {}

  async create(
    transaction: Partial<TransactionEntity>,
  ): Promise<TransactionEntity> {
    const newTransaction = this.repository.create(transaction);
    return this.repository.save(newTransaction);
  }

  async findById(id: string): Promise<TransactionEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async updateStatus(id: string, status: TransactionStatus): Promise<void> {
    await this.repository.update(id, { status });
  }
}
