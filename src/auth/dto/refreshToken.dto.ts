

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {

    @ApiProperty({ description: 'Refresh token', example: "uuid-refresh-token" })
    @IsNotEmpty()
    @IsString()
    refreshToken: string;

    
}