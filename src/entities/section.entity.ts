import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { LectureEntity } from './lecture.entity';

@Entity()
class Section {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	title: string;

	@OneToMany(() => LectureEntity, (lecture) => lecture.section)
	lectures: LectureEntity[];
	@Column()
	courseId: number;
}

export { Section as SectionEntity };
