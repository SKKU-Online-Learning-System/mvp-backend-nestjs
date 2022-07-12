import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class CourseHashtag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int' })
	course_id: number;

	@Column({ type: 'int' })
	hashtag_id: number;
}

export { CourseHashtag as CourseHashtagEntity };
