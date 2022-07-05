import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Lecture } from './lecture.entity';
import { User } from './user.entity';

@Entity()
export class History {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'time' })
	lastTime!: Date;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@ManyToOne(() => User, (user) => user.histories)
	user!: User;

	@ManyToOne(() => Lecture)
	lecture!: Lecture;
}
