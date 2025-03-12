import prisma from 'src/infra/database/prisma/PrismaClient';
import { Product } from 'src/modules/product/domain/entitie/Product';
import { IProductPortRepository } from 'src/modules/product/port/IProductPortRepository';

export class ProductPrismaRepository implements IProductPortRepository {
  async findById(id: string): Promise<Product> {
    const customer = await prisma.product.findFirst({ where: { id } });

    return customer!;
  }

  async create({ description, priceInCents }: Product): Promise<Product> {
    const newProduct = await prisma.product.create({
      data: {
        description,
        priceInCents,
      },
    });

    return newProduct;
  }
  async findManyProducts(): Promise<Product[]> {
    const allProducts = await prisma.product.findMany();

    return allProducts;
  }

  async updatedProduct(
    id: string,
    description?: string,
    priceInCents?: number,
  ): Promise<Product> {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        description,
        priceInCents,
      },
    });

    return updatedProduct;
  }
}
