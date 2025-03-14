import { Payment } from '../domain/entitie/Payment';

export interface IPaymentPortRepository {
  create(payment: Payment): Promise<Payment>;
}
