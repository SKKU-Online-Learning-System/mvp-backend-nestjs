import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class CourseHashtag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int' })
	courseId: number;

	@Column({ type: 'int' })
	hashtagId: number;
}

export { CourseHashtag as CourseHashtagEntity };
