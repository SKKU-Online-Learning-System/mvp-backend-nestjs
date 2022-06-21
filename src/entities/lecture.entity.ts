import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lecture {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	title: string;

	@Column({ type: 'varchar', length: 255 })
	filename: string;

	@Column({ type: 'int' })
	course_id: number;

	@CreateDateColumn({ type: 'datetime' })
	created_at: Date;
}
