import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TransactionEntity } from '@transaction/domain/entities/transaction.entity';
import { TransactionRepository } from '@transaction/infrastructure/repositories/transaction.repository';

export class GetTransactionByIdQuery {
  constructor(public readonly id: string) {}
}

@QueryHandler(GetTransactionByIdQuery)
export class GetTransactionByIdHandler
  implements IQueryHandler<GetTransactionByIdQuery>
{
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(
    query: GetTransactionByIdQuery,
  ): Promise<TransactionEntity | null> {
    return this.transactionRepository.findById(query.id);
  }
}
