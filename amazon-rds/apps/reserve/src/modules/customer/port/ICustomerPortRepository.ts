import { Customer } from '../domain/entitie/Customer';

export interface ICustomerPortRepository {
  create(customer: Customer): Promise<Customer>;
  findByCpf(cpf: string): Promise<Customer>;
}
