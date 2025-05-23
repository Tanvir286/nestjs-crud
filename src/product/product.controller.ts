import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';


@ApiTags('product')
@Controller('product')
export class ProductController {

   constructor(private  readonly productService: ProductService) {}

   /*🏳️<===============(Create Product Start)===============>🏳️*/
   @Post('create')
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @ApiOperation({ summary: 'Create a new product' })
   @ApiResponse({ status: 201, description: 'Product created successfully.' })
   @ApiResponse({ status: 400, description: 'Bad Request.' })
   @ApiResponse({ status: 401, description: 'Unauthorized.' })
   @ApiResponse({ status: 500, description: 'Internal Server Error.' })
   async createProduct(@Body() createProductDto: CreateProductDto) {
       return this.productService.createProduct(createProductDto);
   }
   /*🚩<===============(Create Product End)===============>🚩*/



  /*🏳️<===============(Get All Product Start)===============>🏳️ */
   @Get('getAll')
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @ApiOperation({ summary: 'Get all products' })
   @ApiResponse({ status: 200, description: 'Products retrieved successfully.' })
   @ApiResponse({ status: 401, description: 'Unauthorized.' })
   @ApiResponse({ status: 404, description: 'Not Found.' })
    async getAllProduct() {
         return this.productService.getAllProduct();
   }
  /*🚩<===============(Get All Product End)===============>🚩*/



  /*🏳️<===============(Get A Product Start)===============>🏳️ */
   @Get('getById/:id')
   @UseGuards(JwtAuthGuard)
   @ApiBearerAuth()
   @ApiOperation({ summary: 'Get all products' })
   @ApiResponse({ status: 200, description: 'Products retrieved successfully.' })
   @ApiResponse({ status: 401, description: 'Unauthorized.' })
   @ApiResponse({ status: 404, description: 'Not Found.' })
    async getProductById(@Param('id') id: string) {
         return this.productService.getProductById(id);
   }
  /*🚩<===============(Get All Product End)===============>🚩*/



  /*🏳️<===============(Update A Product Start)===============>🏳️ */
  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a product' })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
   async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
       return this.productService.updateProduct(id, updateProductDto);
  }
  /*🚩<===============(Update A Product End)===============>🚩*/


  /*🏳️<===============(Delete A Product Start)===============>🏳️ */
  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)  
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
   async deleteProduct(@Param('id') id: string) {
       return this.productService.deleteProduct(id);
  }
  /*🚩<===============(Delete A Product End)===============>🚩*/



}


