import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { HistoryEntity } from './history.entity';

@Entity()
class Lecture {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	title: string;

	@Column({ type: 'int' })
	duration: number;

	@Column({ type: 'varchar', length: 255 })
	filepath: string;

	@Column({ type: 'int' })
	course_id: number;

	@Column({ type: 'int' })
	section_id: number;

	@CreateDateColumn({ type: 'datetime' })
	created_at: Date;

	@OneToMany(() => HistoryEntity, (history) => history.lecture)
	histories: History[];
}

export { Lecture as LectureEntity };
