import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class LectureEntity {
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
