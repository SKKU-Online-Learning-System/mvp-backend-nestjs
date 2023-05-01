import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.entity';

@Entity()
class TeachingAssistent {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => CourseEntity)
	course: CourseEntity;
	@Column()
	courseId: number;

	@ManyToOne(() => UserEntity)
	user: UserEntity;
	@Column()
	userId: number;
}

export { TeachingAssistent as TeachingAssistentEntity };
