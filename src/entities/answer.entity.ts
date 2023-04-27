import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { UserEntity } from './user.entity';
import { Comment } from './comment.entity';

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

	@OneToMany(() => Comment, (comment) => comment.answer)
	comments: Comment[];
}
