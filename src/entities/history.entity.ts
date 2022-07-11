import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class History {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'int' })
	user_id: number;

	@Column({ type: 'int' })
	lecture_id: number;

	@Column({ type: 'datetime' })
	created_at: Date;

	@Column({ type: 'int' })
	last_time: number;
}

export { History as HistoryEntity };
