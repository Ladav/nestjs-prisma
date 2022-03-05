import { PartialType } from '@nestjs/mapped-types'
import { IsString, IsNotEmpty, IsOptional, IsDecimal, IsBoolean } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string

  @IsDecimal()
  price: string

  @IsString()
  @IsNotEmpty()
  sku: string

  @IsBoolean()
  @IsOptional()
  published?: boolean
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
