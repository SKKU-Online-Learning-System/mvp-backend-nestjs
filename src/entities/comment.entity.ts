import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { UserEntity } from './user.entity';

@Entity()
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Answer, (answer) => answer.comments)
	answer: Answer;
	@Column()
	answerId: number;

	@ManyToOne(() => UserEntity)
	author: UserEntity;
	@Column()
	authorId: number;

	@Column({ type: 'text' })
	contents: string;

	@CreateDateColumn()
	createdAt: Date;
}
