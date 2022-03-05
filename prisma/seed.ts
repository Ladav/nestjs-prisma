import { PrismaClient } from '@prisma/client'
import products from '../products'

const prismaClient = new PrismaClient()

async function main() {
  for (const product of products) {
    await prismaClient.product.create({ data: product })
  }
}

main()
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prismaClient.$disconnect()
  })
