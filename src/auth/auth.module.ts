import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
imports: [
  TypeOrmModule.forFeature([User]), // Import the User entity
  JwtModule.register({
    secret: 'your_jwt_secret', 
    signOptions: { expiresIn: '15h' }, 
  })
],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
 

