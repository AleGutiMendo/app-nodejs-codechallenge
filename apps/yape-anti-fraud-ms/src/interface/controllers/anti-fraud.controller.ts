import { AntiFraudService } from '@antifraud/application/services/anti-fraud.service';
import { AntiFraudDto } from '@antifraud/interface/dtos/anti-fraud.dto';
import { Controller, Logger } from '@nestjs/common';
import { KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AntiFraudController {
  private readonly logger = new Logger(AntiFraudController.name);

  constructor(private readonly antiFraudService: AntiFraudService) {}

  @MessagePattern('transaction.created')
  async handleAntiFraudValidation(
    @Payload() message: AntiFraudDto,
    context: KafkaContext,
  ) {
    this.logger.log(`Mensaje recibido: ${JSON.stringify(message)}`);

    await this.antiFraudService.handleAntiFraudValidation(message);

    this.logger.log(
      `Anti-fraud validation processed for transaction ${message.id}`,
    );
  }
}
