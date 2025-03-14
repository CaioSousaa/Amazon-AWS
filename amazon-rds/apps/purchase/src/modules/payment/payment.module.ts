import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerPaysProductService } from './services/CustomerPaysProduct.service';
import { PaymentPrismaRepository } from 'src/external/repositories/PaymentPrismaRepository';
import { CustomerPrismaRepository } from 'src/external/repositories/CustomerPrismaRepository';
import { ProductPrismaRepository } from 'src/external/repositories/ProductPrismaRepository';
import { PaymentController } from './infra/http/payment.controller';

@Module({})
export class PaymentModule {
  static forRootAsync(): DynamicModule {
    return {
      module: PaymentModule,
      controllers: [PaymentController],
      imports: [ConfigModule.forRoot()],
      providers: [
        PaymentPrismaRepository,
        CustomerPrismaRepository,
        ProductPrismaRepository,
        CustomerPaysProductService,
        {
          provide: 'STRIPE_SECRET_KEY',
          useFactory: async (configService: ConfigService) =>
            configService.get('STRIPE_SECRET_KEY'),
          inject: [ConfigService],
        },
      ],
    };
  }
}
