import { Controller, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTransactionCommand } from '@transaction/application/commands/create-transaction.command';
import { UpdateTransactionStatusCommand } from '@transaction/application/commands/update-transaction.command';

@Controller()
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @MessagePattern('transaction.request.create')
  async createTransaction(@Payload() message: any) {
    this.logger.log(
      '📥 Recibiendo solicitud de transacción:',
      JSON.stringify(message, null, 2),
    );

    return this.commandBus.execute(new CreateTransactionCommand(message));
  }

  @MessagePattern('transaction.status.updated')
  async updateTransactionStatus(@Payload() message: any) {
    this.logger.log(
      '📥 Recibiendo actualización de estado de transacción:',
      JSON.stringify(message, null, 2),
    );
    return this.commandBus.execute(new UpdateTransactionStatusCommand(message));
  }
}
