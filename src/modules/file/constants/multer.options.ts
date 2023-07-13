import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multerS3 = require('multer-s3')
import { S3Client } from '@aws-sdk/client-s3';
import path = require('path');


export const multerOptionsFactory = (
  configService: ConfigService,
): MulterOptions => {
  // s3 인스턴스를 생성합니다.
  const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });


  return {
    storage: multerS3({
      s3,
      bucket: process.env.AWS_BUCKET_NAME,
      key(_req, file, done) {
        const ext = path.extname(file.originalname); // 파일의 확장자 추출
        const basename = path.basename(file.originalname, ext); // 파일 이름
        done(null, `automata/${basename}${ext}`);
      },
    }),
    //limits: { fileSize: 1000 * 1024 * 1024 }, // 10MB
  };
};