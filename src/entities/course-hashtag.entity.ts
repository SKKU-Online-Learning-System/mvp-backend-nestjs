import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CourseHashtagEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'int' })
	course_id: number;

	@Column({ type: 'int' })
	hashtag_id: number;
}
