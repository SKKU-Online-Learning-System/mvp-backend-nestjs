import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity()
class Hashtag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 20 })
	tag: string;

	@ManyToMany(() => CourseEntity, (course) => course.hashtags)
	courses: CourseEntity[];
}

export { Hashtag as HashtagEntity };
