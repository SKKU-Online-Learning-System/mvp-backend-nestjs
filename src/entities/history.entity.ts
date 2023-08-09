import {
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { LectureEntity } from './lecture.entity';
import { UserEntity } from './user.entity';
import { CourseEntity } from './course.entity';

@Entity()
export class History {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	lastTime: number;

	@UpdateDateColumn()
	updatedAt: Date;

	@Column({ default: false })
	isFinished: boolean;

	@ManyToOne(() => UserEntity)
	user: UserEntity;
	@Column()
	userId: number;

	@ManyToOne(() => LectureEntity)
	lecture: LectureEntity;
	@Column()
	lectureId: number;
}
