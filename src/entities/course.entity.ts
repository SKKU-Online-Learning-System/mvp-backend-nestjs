import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Category1Entity } from './category1.entity';
import { Category2Entity } from './category2.entity';
import { EnrollmentEntity } from './enrollment.entity';
import { UserEntity } from './user.entity';

@Entity()
class Course {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	title: string;

	@Column({ type: 'text' })
	description: string;

	@Column({ type: 'text', nullable: true })
	summary: string;

	@ManyToOne(() => UserEntity, (instructor) => instructor.courses)
	instructor: UserEntity;
	@Column()
	instructorId: number;

	@ManyToOne(() => Category1Entity)
	category1: Category1Entity;
	@Column()
	category1Id: number;

	@ManyToOne(() => Category2Entity)
	category2: Category2Entity;
	@Column()
	category2Id: number;

	@Column({ type: 'varchar', length: 200, nullable: true })
	thumbnail: string;

	@Column()
	difficulty: number;

	@CreateDateColumn()
	createdAt: Date;

	@OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course)
	enrollments: EnrollmentEntity[];
}

export { Course as CourseEntity };
