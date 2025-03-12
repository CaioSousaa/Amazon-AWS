import { Product } from '../domain/entitie/Product';

export interface IProductPortRepository {
  create(product: Product): Promise<Product>;
  findManyProducts(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  updatedProduct(
    id: string,
    description?: string,
    priceInCents?: number,
  ): Promise<Product>;
}
