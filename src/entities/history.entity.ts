import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { LectureEntity } from './lecture.entity';
import { UserEntity } from './user.entity';

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

	@ManyToOne(() => UserEntity, (user) => user.histories)
	user!: UserEntity;

	@ManyToOne(() => LectureEntity)
	lecture!: LectureEntity;
}

export { History as HistoryEntity };
