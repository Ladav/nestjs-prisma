import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaService } from './prisma/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Reference https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  // to avoid prisma call process.exit() before your application shutdown hooks fire
  const prismaService: PrismaService = app.get(PrismaService)
  prismaService.enableShutdownHooks(app)

  await app.listen(3000)
}
bootstrap()
