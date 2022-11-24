import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
class LauchingEvent {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToOne(() => UserEntity)
	user: UserEntity;
	@Column()
	userId: number;

	@Column()
	isProcessed: boolean;
}

export { LauchingEvent as LaunchingEventEntity };
