export class Customer {
  id?: string;
  name: string;
  cpf: string;

  constructor({ name, cpf }: Customer) {
    Object.assign(this, { name, cpf });
  }

  static create({ name, cpf }: Customer) {
    const customer = new Customer({ name, cpf });

    return customer;
  }
}
