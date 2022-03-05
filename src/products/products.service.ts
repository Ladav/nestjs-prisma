import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateProductDto, UpdateProductDto } from './product.dtos'

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  getByIds(ids: number[]) {
    return this.prisma.product.findMany({
      where: {
        id: { in: ids },
      },
    })
  }

  getAll() {
    return this.prisma.product.findMany()
  }

  create(createProjectDto: CreateProductDto) {
    return this.prisma.product.create({ data: createProjectDto })
  }

  updateById(id: number, updates: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updates,
    })
  }

  async deleteById(id: number) {
    await this.prisma.product.delete({
      where: { id },
    })
  }
}
