import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './entity/product.entity';
import { ImageModule } from './image/image.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1943",
      database: "postgres",
      entities: [User,Product],
      synchronize: true,
    }), 
    AuthModule, ProductModule, ImageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
