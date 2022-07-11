import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Answer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int' })
	question_id: number;

	@Column({ type: 'int' })
	user_id: number;

	@Column({ type: 'int' })
	course_id: number;

	@Column({ type: 'int', nullable: true })
	lecture_id: number;

	@Column({ type: 'text' })
	contents: string;

	@CreateDateColumn()
	created_at: Date;
}

export { Answer as AnswerEntity };
