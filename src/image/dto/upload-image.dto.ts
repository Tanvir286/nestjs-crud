import { ApiProperty } from "@nestjs/swagger";
import { diskStorage,File } from 'multer';

export class UploadImageDto {
    

    @ApiProperty({
        type: 'string',
        format: 'binary',
        description: 'The image file to upload'
    })
    file: File;





}