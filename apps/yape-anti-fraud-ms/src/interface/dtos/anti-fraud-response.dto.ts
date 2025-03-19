import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
export enum TransactionStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
export class AntiFraudResponseDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsEnum(TransactionStatus)
  @IsNotEmpty()
  status: TransactionStatus;
}
