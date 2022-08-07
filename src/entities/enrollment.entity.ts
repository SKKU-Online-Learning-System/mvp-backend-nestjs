import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.entity';

@Entity()
class Enrollment {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => UserEntity)
	user: UserEntity;
	@Column()
	userId: number;

	@ManyToOne(() => CourseEntity, (course) => course.enrollments)
	course: CourseEntity;
	@Column()
	courseId: number;

	@CreateDateColumn()
	createdAt: Date;

	@Column({ default: false })
	completed: boolean;

	@Column({ type: 'datetime', nullable: true })
	completedAt: Date;

	@Column({ default: false })
	bookmark: boolean;
}

export { Enrollment as EnrollmentEntity };
