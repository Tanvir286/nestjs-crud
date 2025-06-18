import { Injectable } from '@nestjs/common';
import { diskStorage,File } from 'multer';

@Injectable()
export class ImageService {

    async uploadImage(file: File): Promise<{url: string }> {

        const baseUrl = 'http://localhost:3000/uploads/'; 
        const fileUrl = `${baseUrl}${file.filename}`;
        return { url: fileUrl };
    }
}
