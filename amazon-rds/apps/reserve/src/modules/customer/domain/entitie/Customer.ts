export class Customer {
  id: string;
  name: string;
  cpf: string;

  constructor({ name, cpf, id }: Customer) {
    Object.assign(this, { id, name, cpf });
  }

  static create({ name, cpf, id }: Customer) {
    const customer = new Customer({ name, cpf, id });

    return customer;
  }
}
