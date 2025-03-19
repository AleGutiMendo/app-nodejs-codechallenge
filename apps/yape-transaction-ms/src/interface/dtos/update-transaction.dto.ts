import { PartialType } from '@nestjs/mapped-types';
import { TransactionStatus } from '@transaction/domain/entities/transaction.entity';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsEnum(TransactionStatus)
  @IsNotEmpty()
  status: TransactionStatus;
}
