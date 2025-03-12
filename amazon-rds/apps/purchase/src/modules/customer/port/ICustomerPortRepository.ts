import { Customer } from '../domain/entitie/Customer';

export interface ICustomerPortRepository {
  create(customer: Customer): Promise<Customer>;
  delete(id: string): Promise<void>;
  findByCpf(cpf: string): Promise<Customer | null>;
}
