import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { History } from './history.entity';

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, unique: true })
	email: string;

	@CreateDateColumn({ type: 'datetime' })
	joined_at: Date;

	@Column({ type: 'int', default: 4 })
	privilege: number;

	// @Column({ type: 'varchar', length: 200 })
	// salt: string;

	@OneToMany(() => History, (history) => history.user)
	histories: History[];
}

export { User as UserEntity };
