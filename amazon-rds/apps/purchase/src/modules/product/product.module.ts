import { Module } from '@nestjs/common';
import { CreateProductService } from './services/CreateProduct.service';
import { ProductPrismaRepository } from 'src/external/repositories/ProductPrismaRepository';
import { ProductController } from './infra/http/product.controller';
import { UpdateProductService } from './services/UpdateProduct.service';
import { FindAllProductsService } from './services/FindAllProducts.service';

@Module({
  controllers: [ProductController],
  providers: [
    CreateProductService,
    UpdateProductService,
    ProductPrismaRepository,
    FindAllProductsService,
  ],
})
export class ProductModule {}
