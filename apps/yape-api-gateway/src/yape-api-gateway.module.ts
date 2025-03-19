import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/infrastructure/nestjs/transaction.module';

@Module({
  imports: [TransactionModule],
  controllers: [],
  providers: [],
})
export class YapeApiGatewayModule {}
