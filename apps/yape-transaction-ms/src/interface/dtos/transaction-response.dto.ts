import { TransactionStatus } from '@transaction/domain/entities/transaction.entity';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
export class TransactionResponseDto {
  @IsUUID()
  id: string;

  @IsUUID()
  accountExternalIdDebit: string;

  @IsUUID()
  accountExternalIdCredit: string;

  @IsNumber()
  transferTypeId: number;

  @IsNumber()
  value: number;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsString()
  createdAt: string;
}
