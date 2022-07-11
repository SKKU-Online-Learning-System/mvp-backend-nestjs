import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Question {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int' })
	user_id: number;

	@Column({ type: 'int' })
	course_id: number;
}

export { Question as QuestionEntity };
