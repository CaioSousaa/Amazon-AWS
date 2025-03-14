import { Module } from '@nestjs/common';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { PaymentModule } from 'src/modules/payment/payment.module';
import { ProductModule } from 'src/modules/product/product.module';

@Module({
  imports: [
    CustomerModule,
    ProductModule.forRootAsync(),
    PaymentModule.forRootAsync(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
