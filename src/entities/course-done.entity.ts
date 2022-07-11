import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Course_Done {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int' })
	user_id: number;

	@Column({ type: 'int' })
	course_id: number;

	@Column({ type: 'boolean', default: false })
	bookmark: boolean;
}

export { Course_Done as CourseDoneEntity };
