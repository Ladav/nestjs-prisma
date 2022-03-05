import { Module } from '@nestjs/common'
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter'
import { PrismaModule } from './prisma/prisma.module'
import { ProductsModule } from './products/products.module'

@Module({
  imports: [PrismaModule, ProductsModule],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
