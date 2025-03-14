import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  CustomerPaysProductService,
  IResponse,
} from '../../services/CustomerPaysProduct.service';
import { CreatePaymentDTO } from '../../dto/CreatePaymentDTO';

@Controller('api/purchase/payment')
export class PaymentController {
  constructor(private customerPaysProductService: CustomerPaysProductService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() request: CreatePaymentDTO): Promise<IResponse> {
    return this.customerPaysProductService.execute(request);
  }
}
