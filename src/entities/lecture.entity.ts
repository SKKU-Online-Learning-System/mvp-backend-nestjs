import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';
import { SectionEntity } from './section.entity';

@Entity()
class Lecture {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	title: string;

	@Column()
	duration: number;

	@Column({ type: 'varchar', length: 500 })
	filename: string;

	@ManyToOne(() => CourseEntity)
	course: CourseEntity;
	@Column()
	courseId: number;

	@ManyToOne(() => SectionEntity, (section) => section.lectures)
	section: SectionEntity;
	@Column()
	sectionId: number;

	@CreateDateColumn()
	createdAt: Date;
}

export { Lecture as LectureEntity };
