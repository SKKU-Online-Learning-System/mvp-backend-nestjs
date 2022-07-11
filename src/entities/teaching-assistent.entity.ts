import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Teaching_Assistent {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int' })
	course_id: number;

	@Column({ type: 'int' })
	user_id: number;
}

export { Teaching_Assistent as TeachingAssistentEntity };
