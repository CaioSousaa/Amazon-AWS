import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

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
export class PurchaseService {
  constructor(
    @Inject('PURCHASE_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async sendPurchaseEvent(purchaseData: IProducerData) {
    console.log(
      `[PURCHASE] Sending event in topic purchase-product:`,
      purchaseData,
    );
    this.kafkaClient.emit('purchase-product', purchaseData);
  }
}
