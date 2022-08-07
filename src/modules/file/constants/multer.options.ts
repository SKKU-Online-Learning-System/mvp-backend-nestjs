import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';

export const VideoMulterOptions = {
	storage: diskStorage({
		destination: (req, file, callback) => {
			const uploadPath = join(
				'public/videos',
				req.body.courseId.toString(),
			);
			if (!existsSync(uploadPath)) {
				mkdirSync(uploadPath);
			}
			callback(null, uploadPath);
		},
		filename: (req, file, callback) => {
			callback(null, `${Date.now()}-${file.originalname}`);
		},
	}),
	fileFilter: (req, file, callback) => {
		if (file.mimetype.match(/\/(mp4)$/)) {
			callback(null, true);
		} else {
			callback(
				new HttpException(
					'Video type is not supported',
					HttpStatus.BAD_REQUEST,
				),
				false,
			);
		}
	},
	limits: {
		fileSize: 10485760 * 1000, // 10GB
	},
};

export const ImageMulterOptions = (imageType: string) => {
	return {
		storage: diskStorage({
			destination: (req, file, callback) => {
				const uploadPath = join('public/images', imageType);
				if (!existsSync(uploadPath)) {
					mkdirSync(uploadPath);
				}
				callback(null, uploadPath);
			},
			filename: (req, file, callback) => {
				callback(null, `${Date.now()}-${file.originalname}`);
			},
		}),
		fileFilter: (req, file, callback) => {
			if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
				callback(null, true);
			} else {
				callback(
					new HttpException(
						'Image type is not supported',
						HttpStatus.BAD_REQUEST,
					),
					false,
				);
			}
		},
		limits: {
			fileSize: 16777216, // 16MB
		},
	};
};
