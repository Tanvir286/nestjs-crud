import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ImageService } from './image.service';
import { JwtAuthGuard } from 'src/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage,File } from 'multer';
import { extname } from 'path';
import { UploadImageDto } from './dto/upload-image.dto';

@ApiTags('image')
@Controller('image')
export class ImageController {

    constructor(private readonly imageService: ImageService) {}

    /*🏳️<===============(Image Upload Start)===============>🏳️*/
    @Post('upload')
    // @UseGuards(JwtAuthGuard)
    // @ApiBearerAuth()
    @ApiOperation({ summary: 'Upload an image' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Image file to upload',
        type: UploadImageDto,
    })

    @ApiResponse({ status: 201, description: 'Image uploaded successfully.', type: Object }) 
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.'})
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const ext = extname(file.originalname);
                    callback(null, file.fieldname + '-' + uniqueSuffix + ext);
                }
            }),
            fileFilter: (req, file, callback) => {
                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                const allowedExts = ['.jpg', '.jpeg', '.png', '.gif'];
                const fileExt = extname(file.originalname).toLowerCase();
                const extIsValid = allowedExts.includes(fileExt);
                const mimetypeIsValid = allowedTypes.includes(file.mimetype);
                if (mimetypeIsValid && extIsValid) {
                    return callback(null, true);
                }
                callback(new Error('Invalid file type'), false);
            }
        }) 
    )
    // Add method to handle the upload (e.g., uploadImage)
    async uploadImage(@UploadedFile() file:File) {
        if (!file) {
            throw new Error('File not found');
        }
        return this.imageService.uploadImage(file);
    }
       
}



