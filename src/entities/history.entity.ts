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
class History {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'time' })
	lastTime!: Date;

	@CreateDateColumn({ type: 'datetime' })
	createdAt!: Date;

	@UpdateDateColumn({ type: 'datetime' })
	updatedAt!: Date;

	@ManyToOne(() => User, (user) => user.histories)
	user!: User;

	@ManyToOne(() => Lecture)
	lecture!: Lecture;
}

export { History as HistoryEntity };
