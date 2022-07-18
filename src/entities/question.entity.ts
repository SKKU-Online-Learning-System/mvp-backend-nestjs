import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { LectureEntity } from './lecture.entity';
import { UserEntity } from './user.entity';

@Entity()
class Question {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => UserEntity)
	user: UserEntity;
	@Column()
	userId: number;

	// @ManyToOne(() => CourseEntity)
	// course: CourseEntity;
	@Column()
	courseId: number;

	// @ManyToOne(() => LectureEntity)
	// lecture: LectureEntity;
	@Column({ nullable: true })
	lectureId: number;

	@Column({ type: 'text' })
	contents: string;

	@CreateDateColumn()
	createdAt: Date;
}

export { Question as QuestionEntity };
