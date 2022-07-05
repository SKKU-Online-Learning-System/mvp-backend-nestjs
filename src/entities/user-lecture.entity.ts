import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class User_Lecture {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'int' })
	user_id: number;

	@Column({ type: 'int' })
	lecture_id: number;
}

export { User_Lecture as UserLectureEntity };
