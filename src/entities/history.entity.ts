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
	id: number;

	@Column({ type: 'time' })
	last_time: Date;

	@CreateDateColumn({ type: 'datetime' })
	created_at: Date;

	@UpdateDateColumn({ type: 'datetime' })
	updated_at: Date;

	@ManyToOne(() => UserEntity, (user) => user.histories)
	user: UserEntity;

	@ManyToOne(() => LectureEntity, (lecture) => lecture.histories)
	lecture: LectureEntity;
}

export { History as HistoryEntity };
