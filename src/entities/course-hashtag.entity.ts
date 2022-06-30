import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Course_hashtag {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'int' })
	course_id: number;

	@Column({ type: 'int' })
	hashtag_id: number;
}

export { Course_hashtag as CourseHashtagEntity };
