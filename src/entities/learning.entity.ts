import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.entity';

@Entity()
class Learning {
	@PrimaryGeneratedColumn()
	id: number;

	// @ManyToOne(() => UserEntity)
	// user: UserEntity;
	@Column()
	userId: number;

	// @ManyToOne(() => CourseEntity)
	// course: CourseEntity;
	@Column()
	courseId: number;

	@Column({ default: false })
	bookmark: boolean;
}

export { Learning as LearningEntity };
