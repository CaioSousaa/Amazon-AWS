export class Product {
  id?: string;
  description: string;
  priceInCents: number;

  constructor({ description, priceInCents }: Product) {
    Object.assign(this, { description, priceInCents });
  }

  static create({ description, priceInCents }: Product) {
    const product = new Product({ description, priceInCents });

    return product;
  }
}
