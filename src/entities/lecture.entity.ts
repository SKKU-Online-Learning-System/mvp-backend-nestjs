import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

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
}

export { Lecture as LectureEntity };
