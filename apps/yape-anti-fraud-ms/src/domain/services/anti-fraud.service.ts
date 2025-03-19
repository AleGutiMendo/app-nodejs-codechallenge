import { TransactionStatus } from '@antifraud/interface/dtos/anti-fraud-response.dto';
import { AntiFraudTransaction } from '../entities/anti-fraud.entity';

export class AntiFraudValidator {
  constructor(private readonly maxAmount: number) {}

  validate(transaction: AntiFraudTransaction): TransactionStatus {
    return transaction.isFraudulent(this.maxAmount)
      ? TransactionStatus.REJECTED
      : TransactionStatus.APPROVED;
  }
}
