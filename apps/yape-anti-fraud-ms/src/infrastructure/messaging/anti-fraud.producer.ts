import { AntiFraudResponseDto } from '@antifraud/interface/dtos/anti-fraud-response.dto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AntiFraudProducer {
  private readonly logger = new Logger(AntiFraudProducer.name);

  constructor(
    @Inject('KAFKA_PRODUCER') private readonly kafkaClient: ClientKafka,
  ) {}

  async publishAntiFraudValidation(
    message: AntiFraudResponseDto,
  ): Promise<boolean> {
    if (!this.kafkaClient) {
      this.logger.error('Kafka Client no está inicializado.');
      return false;
    }

    const payload = JSON.parse(JSON.stringify(message));

    this.logger.log(`Enviando mensaje a Kafka: ${JSON.stringify(payload)}`);

    try {
      await firstValueFrom(
        this.kafkaClient.emit('transaction.status.updated', payload),
      );
      this.logger.log(
        `Mensaje enviado a Kafka: transaction.status.updated - ID ${message.id}`,
      );
      return true;
    } catch (err) {
      this.logger.error(
        `Error enviando mensaje a Kafka: ${err.message}`,
        err.stack,
      );
      return false;
    }
  }
}
