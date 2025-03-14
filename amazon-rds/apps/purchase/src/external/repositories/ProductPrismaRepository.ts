import prisma from 'src/infra/database/prisma/PrismaClient';
import { Product } from 'src/modules/product/domain/entitie/Product';
import { IProductPortRepository } from 'src/modules/product/port/IProductPortRepository';

export class ProductPrismaRepository implements IProductPortRepository {
  async findById(id: string): Promise<Product> {
    const customer = await prisma.product.findFirst({ where: { id } });

    return customer!;
  }

  async create({ description, priceInCents, id }: Product): Promise<Product> {
    const newProduct = await prisma.product.create({
      data: {
        id,
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
}
