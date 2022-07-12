import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CourseEntity } from './course.entity';
import { UserEntity } from './user.entity';

@Entity()
class Wishlist {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => UserEntity)
	user: UserEntity;
	@Column()
	userId: number;

	@ManyToOne(() => CourseEntity)
	course: CourseEntity;
	@Column()
	courseId: number;
}

export { Wishlist as WishlistEntity };
