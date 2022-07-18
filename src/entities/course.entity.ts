import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Category1Entity } from './category1.entity';
import { Category2Entity } from './category2.entity';
import { UserEntity } from './user.entity';

@Entity()
class Course {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	title: string;

	@Column({ type: 'text' })
	description: string;

	// @ManyToOne(() => UserEntity)
	// @JoinColumn({ name: 'instructorId' })
	// instructor: UserEntity;
	@Column()
	instructorId: number;

	// @ManyToOne(() => Category1Entity)
	// category1: Category1Entity;
	@Column()
	category1Id: number;

	// @ManyToOne(() => Category2Entity)
	// category2: Category2Entity;
	@Column()
	category2Id: number;

	@Column({ type: 'varchar', length: 200, nullable: true })
	thumbnail: string;

	@Column()
	difficulty: number;

	@CreateDateColumn()
	createdAt: Date;
}

export { Course as CourseEntity };
