import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { PrismaError } from 'src/common/utils/prisma-error'
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
    try {
      await this.prisma.product.delete({
        where: { id },
      })
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e?.code === PrismaError.RecordDoesNotExist) {
        throw new NotFoundException('Not found')
      }
      throw new InternalServerErrorException()
    }
  }
}
