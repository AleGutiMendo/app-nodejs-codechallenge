import { TransactionService } from '@apiGateway/application/services/transaction.service';
import { CreateTransactionDto } from '@apiGateway/interface/dtos/create-transaction.dto';
import { Body, Controller, Post, Version } from '@nestjs/common';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Version('1')
  @Post('create')
  async createTransaction(@Body() transactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(transactionDto);
  }
}
