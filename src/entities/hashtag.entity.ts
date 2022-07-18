import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity()
class Hashtag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 20 })
	tag: string;

	// @ManyToOne(() => CourseEntity)
	// course: CourseEntity;
	@Column()
	courseId: number;
}

export { Hashtag as HashtagEntity };
