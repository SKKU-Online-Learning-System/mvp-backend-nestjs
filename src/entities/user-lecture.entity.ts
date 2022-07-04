import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserLectureEntity {
	@PrimaryGeneratedColumn({ type: 'int' })
	id: number;

	@Column({ type: 'int' })
	user_id: number;

	@Column({ type: 'int' })
	lecture_id: number;
}
