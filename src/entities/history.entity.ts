import {
	Column,
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

	@Column()
	lastTime: number;

	@UpdateDateColumn()
	updatedAt: Date;

	// @ManyToOne(() => UserEntity)
	// user: UserEntity;
	@Column()
	userId: number;

	// @ManyToOne(() => LectureEntity)
	// lecture: LectureEntity;
	@Column()
	lectureId: number;
}

export { History as HistoryEntity };
