export class Payment {
  id?: string;
  customer_id: string;
  product_id: string;
  createdAt: Date;

  constructor({ customer_id, product_id, createdAt }: Payment) {
    Object.assign(this, { customer_id, product_id, createdAt });
  }

  static create({ customer_id, product_id }: Payment) {
    const payment = new Payment({
      customer_id,
      product_id,
      createdAt: new Date(),
    });

    return payment;
  }
}
