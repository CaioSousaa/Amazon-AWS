import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { ProductPrismaRepository } from 'src/external/repositories/ProductPrismaRepository';
import { IProductPortRepository } from '../port/IProductPortRepository';
import { IUpdateproductDTO } from '../dto/IUpdateProductDTO';
import { Product } from '../domain/entitie/Product';

@Injectable()
export class UpdateProductService {
  constructor(
    @Inject(ProductPrismaRepository)
    private productRepository: IProductPortRepository,
  ) {}

  async execute(
    { description, priceInCents }: IUpdateproductDTO,
    id: string,
  ): Promise<Product> {
    const productExists = await this.productRepository.findById(id);

    if (!productExists) {
      throw new NotAcceptableException('product does not exist');
    }

    const updatedProduct = await this.productRepository.updatedProduct(
      id,
      description,
      priceInCents,
    );

    return updatedProduct;
  }
}
