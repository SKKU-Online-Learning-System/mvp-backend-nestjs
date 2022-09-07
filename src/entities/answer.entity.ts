import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { UserEntity } from './user.entity';

@Entity()
export class Answer {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Question, (question) => question.answers)
	question: Question;
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
