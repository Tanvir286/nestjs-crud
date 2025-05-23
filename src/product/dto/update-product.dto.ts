
 import { ApiProperty } from "@nestjs/swagger";
 import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";


 export class UpdateProductDto {

     @ApiProperty({ description: 'Product name', example: "Product Name" })
     @IsString()
     @IsOptional()
     name: string;
 
     @ApiProperty({ description: 'Product description', example: "Product Description" })
     @IsString()
     @IsOptional()
     description: string;
 
     @ApiProperty({ description: 'Product price', example: 100 })
     @IsNumber()
     @IsOptional()
     @Min(0)
     price: number;
 
     @ApiProperty({ description: 'Product stock', example: 50 })
     @IsNumber()
     @IsOptional()   
     @Min(0)
     stock: number;
 
 }   