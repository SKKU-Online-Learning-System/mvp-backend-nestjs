import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { status } from 'src/configs/http-response/http-response.config';
import { CourseEntity } from 'src/entities/course.entity';
import { LectureEntity } from 'src/entities/lecture.entity';
import { DataSource } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class FileService {
	constructor(private dataSource: DataSource) {}

	async getVideo(lectureId: number) {
		const lecture = await this.dataSource
			.createQueryBuilder()
			.from(LectureEntity, 'lecture')
			.select('lecture')
			.where('lecture.id = :lectureId', { lectureId })
			.getOne();
		return createReadStream(
			join(
				process.cwd(),
				'public/videos',
				lecture.courseId.toString(),
				lecture.filename,
			),
		);
	}

	async createVideo(createVideoDto: CreateVideoDto) {
		const lecture = await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(LectureEntity)
			.values([{ ...createVideoDto }])
			.execute();
		if (lecture.raw.affectedRows) {
			return status(HttpStatus.CREATED, 'video uploaded');
		} else {
			throw new InternalServerErrorException('video upload fail');
		}
	}

	async getCourseImage(courseId: number) {
		const course = await this.dataSource
			.createQueryBuilder()
			.from(CourseEntity, 'course')
			.select('course')
			.where('course.id = :courseId', { courseId })
			.getOne();
		return { image_url: join('courseImage', course.thumbnail) };
	}

	async updateCourseImage(courseId: number, file: Express.Multer.File) {
		const course = await this.dataSource
			.createQueryBuilder()
			.update(CourseEntity)
			.set({ thumbnail: file.filename })
			.where('id = :courseId', { courseId })
			.execute();
		if (course.affected === 0) {
			throw new InternalServerErrorException('update thumbnail fail');
		}
		return status(HttpStatus.ACCEPTED, 'course image updated');
	}
}
