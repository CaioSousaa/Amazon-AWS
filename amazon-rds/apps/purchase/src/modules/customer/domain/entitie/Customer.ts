export class Customer {
  id?: string;
  name: string;
  cpf: string;
  age: number;
  createdAt: Date;

  constructor({ name, cpf, age, createdAt }: Customer) {
    Object.assign(this, { name, cpf, age, createdAt });
  }

  static create({ name, cpf, age }: Customer) {
    const customer = new Customer({
      name,
      cpf,
      age,
      createdAt: new Date(),
    });

    return customer;
  }
}
