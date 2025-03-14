export class Product {
  id: string;
  description: string;
  priceInCents: number;

  constructor({ id, description, priceInCents }: Product) {
    Object.assign(this, { id, description, priceInCents });
  }

  static create({ id, description, priceInCents }: Product) {
    const product = new Product({ id, description, priceInCents });

    return product;
  }
}
