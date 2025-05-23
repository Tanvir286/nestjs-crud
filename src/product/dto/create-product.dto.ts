import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";


export class CreateProductDto {
  
    @ApiProperty({ description: 'Product name', example: "Product Name" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Product description', example: "Product Description" })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Product price', example: 100 })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;

    @ApiProperty({ description: 'Product stock', example: 50 })
    @IsNotEmpty()   
    @IsNumber()
    @Min(0)
    stock: number;

}   