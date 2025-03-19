import { AntiFraudTransaction } from '@antifraud/domain/entities/anti-fraud.entity';
import { AntiFraudValidator } from '@antifraud/domain/services/anti-fraud.service';
import { AntiFraudProducer } from '@antifraud/infrastructure/messaging/anti-fraud.producer';
import { AntiFraudDto } from '@antifraud/interface/dtos/anti-fraud.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AntiFraudService {
  private readonly validator: AntiFraudValidator;

  constructor(private readonly antiFraudProducer: AntiFraudProducer) {
    this.validator = new AntiFraudValidator(Number(process.env.MAX_AMOUNT));
  }

  async handleAntiFraudValidation(message: AntiFraudDto) {
    const transaction = new AntiFraudTransaction(message.id, message.value);
    const status = this.validator.validate(transaction);

    await this.antiFraudProducer.publishAntiFraudValidation({
      id: message.id,
      status,
    });
  }
}
