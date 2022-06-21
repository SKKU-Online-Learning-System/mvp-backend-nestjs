import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	title: string;

	@Column({ type: 'text' })
	description: string;

	@Column({ type: 'int' })
	instructor_id: number;

	@Column({ type: 'int' })
	cat1_id: number;

	@Column({ type: 'int' })
	cat2_id: number;

	@Column({ type: 'varchar', length: 200, nullable: true })
	thumbnail: string;

	@Column({ type: 'int' })
	difficulty: number;

	@CreateDateColumn({ type: 'datetime' })
	created_at: Date;
}
