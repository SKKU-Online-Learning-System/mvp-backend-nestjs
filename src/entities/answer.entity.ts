import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
import { UserEntity } from './user.entity';

@Entity()
class Answer {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => QuestionEntity, (question) => question.answers)
	question: QuestionEntity;
	@Column()
	questionId: number;

	@ManyToOne(() => UserEntity)
	author: UserEntity;
	@Column()
	authorId: number;

	@Column({ type: 'text' })
	contents: string;

	@CreateDateColumn()
	createdAt: Date;
}

export { Answer as AnswerEntity };
