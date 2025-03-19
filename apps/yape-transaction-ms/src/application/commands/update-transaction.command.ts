import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TransactionRepository } from '@transaction/infrastructure/repositories/transaction.repository';
import { UpdateTransactionDto } from '@transaction/interface/dtos/update-transaction.dto';

export class UpdateTransactionStatusCommand {
  constructor(public readonly dto: UpdateTransactionDto) {}
}

@CommandHandler(UpdateTransactionStatusCommand)
export class UpdateTransactionStatusHandler
  implements ICommandHandler<UpdateTransactionStatusCommand>
{
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(command: UpdateTransactionStatusCommand): Promise<void> {
    await this.transactionRepository.updateStatus(
      command.dto.id,
      command.dto.status,
    );
  }
}
