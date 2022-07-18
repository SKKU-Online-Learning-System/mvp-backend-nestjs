import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { LectureEntity } from './lecture.entity';
import { QuestionEntity } from './question.entity';
import { UserEntity } from './user.entity';

@Entity()
class Answer {
	@PrimaryGeneratedColumn()
	id: number;

	// @ManyToOne(() => QuestionEntity)
	// question: QuestionEntity;
	@Column()
	questionId: number;

	// @ManyToOne(() => UserEntity)
	// user: UserEntity;
	@Column()
	userId: number;

	// @ManyToOne(() => CourseEntity)
	// course: CourseEntity;
	@Column()
	courseId: number;

	// @ManyToOne(() => LectureEntity)
	// lecture: LectureEntity;
	@Column()
	lectureId: number;

	@Column({ type: 'text' })
	contents: string;

	@CreateDateColumn()
	createdAt: Date;
}

export { Answer as AnswerEntity };
