import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

export interface IProducerData {
  customer: {
    customer_id: string;
    name: string;
    cpf: string;
  };
  product: {
    product_id: string;
    priceInCents: number;
  };
  payment: {
    payment_id: string;
  };
  appointmentDate: Date;
}

@Injectable()
export class ReserveService implements OnModuleInit {
  constructor(
    @Inject('RESERVE_SERVICE') private readonly kafkaClient: ClientKafka,
    private eventEmitter: EventEmitter2,
  ) {}

  async onModuleInit() {
    console.log('[RESERVE] Connecting to Kafka...');
    await this.kafkaClient.connect();
    console.log('[RESERVE] Connected to Kafka.');
  }

  @MessagePattern('purchase-product')
  async handlePurchaseEvent(@Payload() purchaseData: IProducerData) {
    console.log('[RESERVE] Emitindo evento: purchaseEvent.received', purchaseData);
    this.eventEmitter.emit('purchaseEvent.received', purchaseData);
  }
}
