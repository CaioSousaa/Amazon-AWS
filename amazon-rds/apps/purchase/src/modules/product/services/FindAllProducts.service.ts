import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { ProductPrismaRepository } from 'src/external/repositories/ProductPrismaRepository';
import { IProductPortRepository } from '../port/IProductPortRepository';
import { Product } from '../domain/entitie/Product';

@Injectable()
export class FindAllProductsService {
  constructor(
    @Inject(ProductPrismaRepository)
    private productRepository: IProductPortRepository,
  ) {}

  async execute(): Promise<Product[]> {
    const allProducts = await this.productRepository.findManyProducts();

    if (allProducts.length === 0) {
      throw new NotAcceptableException('no services registered!!!');
    }

    return allProducts;
  }
}
