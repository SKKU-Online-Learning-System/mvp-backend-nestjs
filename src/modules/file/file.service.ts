import {
	HttpStatus,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common';
import { existsSync, unlink } from 'fs';
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
		const lecture = await this.getLecture(lectureId);
		if (!lecture) {
			throw new InternalServerErrorException('lecture not found');
		}

		let videoPath = join(lecture.courseId.toString(), lecture.filename);

		if (!existsSync(join('public/videos', videoPath))) {
			throw new InternalServerErrorException('video not found');
		}

		videoPath = join('video', videoPath);
		return { video_url: videoPath };
	}

	private getLecture(lectureId: number): Promise<LectureEntity> {
		return this.dataSource
			.createQueryBuilder()
			.from(LectureEntity, 'lecture')
			.select('lecture')
			.where('lecture.id = :lectureId', { lectureId })
			.getOne();
	}

	async createVideo({ video, ...rest }: CreateVideoDto) {
		const lecture = await this.dataSource
			.createQueryBuilder()
			.insert()
			.into(LectureEntity)
			.values([{ ...rest, filename: video.filename }])
			.execute();
		if (lecture.raw.affectedRows) {
			return status(HttpStatus.CREATED, 'video uploaded');
		} else {
			throw new InternalServerErrorException('video upload fail');
		}
	}

	async deleteVideo(lectureId: number) {
		const lecture = await this.getLecture(lectureId);
		const filePath = join(
			process.cwd(),
			`public/videos/${lecture.courseId}`,
			lecture.filename,
		);
		if (existsSync(filePath)) {
			unlink(filePath, (err) => {
				if (err) {
					throw new InternalServerErrorException(err);
				}
			});
		} else {
			throw new InternalServerErrorException('video not exist');
		}
		const lectureDeleteExectution = await this.dataSource
			.createQueryBuilder()
			.delete()
			.from(LectureEntity)
			.where('id = :lectureId', { lectureId })
			.execute();
		if (lectureDeleteExectution.affected === 0) {
			throw new InternalServerErrorException('video delete fail');
		}

		return status(HttpStatus.OK, 'video deleted');
	}

	async getCourseImage(courseId: number) {
		const course = await this.getCourse(courseId);
		if (!course || course.thumbnail) {
			throw new InternalServerErrorException(
				'course or course image not found',
			);
		}
		return { image_url: join('courseImage', course.thumbnail) };
	}

	private getCourse(courseId: number): Promise<CourseEntity> {
		return this.dataSource
			.createQueryBuilder()
			.from(CourseEntity, 'course')
			.select('course')
			.where('course.id = :courseId', { courseId })
			.getOne();
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

	async deleteCourseImage(courseId: number) {
		const course = await this.getCourse(courseId);

		if (!course || !course.thumbnail) {
			throw new InternalServerErrorException(
				'course itself or course image not found',
			);
		}

		const videoPath = join(
			process.cwd(),
			'public/images/courses',
			course.thumbnail,
		);

		if (!existsSync(videoPath)) {
			throw new InternalServerErrorException('course image not found');
		}

		unlink(videoPath, (err) => {
			if (err) {
				throw new InternalServerErrorException(err);
			}
		});

		return status(HttpStatus.OK, 'image deleted');
	}
}
