import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { Response } from 'express'
import { PrismaError } from './common/utils/prisma-error'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()

    switch (exception.code) {
      // handling record not found error
      case PrismaError.RecordDoesNotExist:
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Not found',
        })

      // handling unique constraint failed error
      case PrismaError.UniqueConstraintFailed:
        return response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message:
            exception.meta && 'target' in exception.meta && Array.isArray(exception.meta['target'])
              ? `${exception.meta['target'].join(', ')}: field unique contraint failed`
              : exception.message,
        })

      default:
        super.catch(exception, host)
    }
  }
}
