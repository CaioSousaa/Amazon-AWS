import { Inject, Injectable } from '@nestjs/common';
import { ProductPrismaRepository } from 'src/external/repositories/ProductPrismaRepository';
import { IProductPortRepository } from '../port/IProductPortRepository';
import { CreateProductDTO } from '../dto/CreateProductDTO';
import { Product } from '../domain/entitie/Product';

@Injectable()
export class CreateProductService {
  constructor(
    @Inject(ProductPrismaRepository)
    private productRepository: IProductPortRepository,
  ) {}

  async execute({
    description,
    priceInCents,
  }: CreateProductDTO): Promise<Product> {
    const product = new Product({
      description,
      priceInCents,
    });

    const newProduct = await this.productRepository.create(product);

    return newProduct;
  }
}
