import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User_Course {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int' })
	user_id: number;

	@Column({ type: 'int' })
	course_id: number;

	@Column({ type: 'boolean', default: false })
	status: boolean;
}

export { User_Course as UserCourseEntity };
