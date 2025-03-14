import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('PURCHASE_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async sendPurchaseEvent(purchaseData: any) {
    console.log(`[PURCHASE] Sending event:`, purchaseData);
    this.kafkaClient.emit('purchase-product', purchaseData);
  }
}
