import { DynamicModule, Module } from '@nestjs/common';
import { CreateProductService } from './services/CreateProduct.service';
import { ProductPrismaRepository } from 'src/external/repositories/ProductPrismaRepository';
import { ProductController } from './infra/http/product.controller';
import { FindAllProductsService } from './services/FindAllProducts.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class ProductModule {
  static forRootAsync(): DynamicModule {
    return {
      module: ProductModule,
      imports: [ConfigModule.forRoot()],
      controllers: [ProductController],
      providers: [
        CreateProductService,
        {
          provide: 'STRIPE_SECRET_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.get('STRIPE_SECRET_KEY'),
          inject: [ConfigService],
        },
        ProductPrismaRepository,
        FindAllProductsService,
      ],
    };
  }
}
