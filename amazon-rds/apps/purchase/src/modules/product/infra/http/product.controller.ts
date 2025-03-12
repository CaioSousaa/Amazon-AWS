import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateProductService } from '../../services/CreateProduct.service';
import { CreateProductDTO } from '../../dto/CreateProductDTO';
import { IUpdateproductDTO } from '../../dto/IUpdateProductDTO';
import { UpdateProductService } from '../../services/UpdateProduct.service';
import { FindAllProductsService } from '../../services/FindAllProducts.service';

@Controller('api/purchase/product')
export class ProductController {
  constructor(
    private createProductService: CreateProductService,
    private updateProductService: UpdateProductService,
    private findAllProductsService: FindAllProductsService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() request: CreateProductDTO) {
    return this.createProductService.execute(request);
  }

  @Put(':id')
  async updated(@Body() request: IUpdateproductDTO, @Param('id') id: string) {
    return this.updateProductService.execute(request, id);
  }

  @Get('all')
  async getAll() {
    return this.findAllProductsService.execute();
  }
}
