import { Module } from '@nestjs/common';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { ProductModule } from 'src/modules/product/product.module';

@Module({
  imports: [CustomerModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
