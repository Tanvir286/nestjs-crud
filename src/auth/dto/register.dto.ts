
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class RegisterDto {

    @ApiProperty({description: 'User email address', example: "user@example.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({description: 'User password', example: "password123" })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({description: 'User first name', example: "John" })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty({description: 'User last name', example: "Doe" })
    @IsString()
    @IsNotEmpty()
    lastName: string;


    @ApiProperty({description: 'User username', example: "johndoe" })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({description: 'User role', example: "admin" })
    @IsString()
    @IsNotEmpty()
    role: string;
     
} 