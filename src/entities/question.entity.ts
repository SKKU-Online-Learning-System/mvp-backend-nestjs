import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { AnswerEntity } from './answer.entity';
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

	@OneToMany(() => AnswerEntity, (answer) => answer.question)
	answers: AnswerEntity[];
}

export { Question as QuestionEntity };
