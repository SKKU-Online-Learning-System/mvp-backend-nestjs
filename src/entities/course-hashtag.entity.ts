import { ManyToOne } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { HashtagEntity } from './hashtag.entity';

@Entity()
class CourseHashtag {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => CourseEntity)
	course: CourseEntity;
	@Column({ type: 'int' })
	courseId: number;

	@ManyToOne(() => HashtagEntity)
	hashtag: HashtagEntity;
	@Column({ type: 'int' })
	hashtagId: number;
}

export { CourseHashtag as CourseHashtagEntity };
