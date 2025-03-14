import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductService } from '../../services/CreateProduct.service';
import { FindAllProductsService } from '../../services/FindAllProducts.service';

@Controller('api/purchase/product')
export class ProductController {
  constructor(
    private createProductService: CreateProductService,
    private findAllProductsService: FindAllProductsService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async create() {
    return this.createProductService.execute();
  }

  @Get('all')
  async getAll() {
    return this.findAllProductsService.execute();
  }
}
