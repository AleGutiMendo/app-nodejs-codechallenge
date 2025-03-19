import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class AntiFraudDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;
}
