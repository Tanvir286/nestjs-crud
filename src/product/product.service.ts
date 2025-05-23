
import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

    /*<========================================>
         🏳️   Create Product  Start    🏳️
    ===========================================>*/
    async createProduct(createProductDto: CreateProductDto): Promise<{ message: string; product?: Product }> {
        const product = this.productRepository.create(createProductDto);
        try {
            const savedProduct = await this.productRepository.save(product);
            return {
                message: 'Product created successfully.',
                product: savedProduct,
            };
        } catch (error) {
        if (error.code === '23505') {
            // PostgreSQL duplicate error code
            throw new ConflictException('Product with this name already exists.');
        }
        throw new InternalServerErrorException('Failed to create product.');
        }
    }
    /*<========================================>
       🚩       Create Product End        🚩
    ===========================================>*/


    /*<========================================>
         🏳️   get All Product  Start    🏳️
    ===========================================>*/
    async getAllProduct(): Promise<Product[]> {
      return this.productRepository.find();
    }

    /*<========================================>
       🚩      get All Product End        🚩
    ===========================================>*/


    /*<========================================>
          🏳️   get A Single Product  Start    🏳️
    ===========================================>*/
    async getProductById(id: string): Promise<Product> {
    
            const product = await this.productRepository.findOne({ where: { id: Number(id) } });
            if (!product) {
                throw new NotFoundException(`Product ${id} not found.`);
            }
            return product;
     
    }
    /*<========================================>
       🚩      get A Single Product End     🚩
    ===========================================>*/


    /*<========================================>
       🏳️  Update A Single Product  Start  🏳️
    ===========================================>*/
    async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product> {

        const product = await this.productRepository.findOne({ where: { id: Number(id) } });
        
        if (!product) {
            throw new NotFoundException(`Product ${id} not found.`);
        }
        
        Object.assign(product, updateProductDto);
        return this.productRepository.save(product);
    }
    /*<========================================>
       🚩      Update A Single Product End     🚩
    ===========================================>*/
    

    /*<========================================>
       🏳️  Delete A Single Product  Start  🏳️
    ===========================================>*/
  
    async deleteProduct(id: string): Promise<{ message: string }> {
        
        const product = await this.productRepository.findOne({ where: { id: Number(id) } });
        
        if (!product) {
            throw new NotFoundException(`Product ${id} not found.`);
        }
        
        await this.productRepository.remove(product);
        return { message: `Product ${id} deleted successfully.` };
    }

    /*<========================================>
       🚩      Delete A Single Product End     🚩
    ===========================================>*/


}

