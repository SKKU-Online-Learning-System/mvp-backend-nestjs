import { Transform } from 'class-transformer';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Category1Entity } from './category1.entity';
import { Category2Entity } from './category2.entity';
import { EnrollmentEntity } from './enrollment.entity';
import { HashtagEntity } from './hashtag.entity';
import { UserEntity } from './user.entity';

@Entity()
class Course {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	title: string;

	@Column({ type: 'text' })
	summary: string;

	@Column({ type: 'text' })
	description: string;

	@Column({ type: 'varchar', length: 20 })
	instructor: string;

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

	@Column()
	lectureCnt: number;

	@CreateDateColumn()
	createdAt: Date;

	@OneToMany(() => EnrollmentEntity, (enrollment) => enrollment.course)
	enrollments: EnrollmentEntity[];

	@ManyToMany(() => HashtagEntity, (hashtag) => hashtag.courses)
	@JoinTable()
	hashtags: HashtagEntity[];
}

export { Course as CourseEntity };
