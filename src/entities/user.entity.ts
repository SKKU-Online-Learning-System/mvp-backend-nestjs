import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { HistoryEntity } from './history.entity';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 200 })
	password: string;

	@Column({ type: 'varchar', length: 20 })
	name: string;

	// @Column({ type: 'bool' })
	// sex: boolean;

	// @Column({ type: 'varchar', length: 20 })
	// phone: string;

	// @Column({ type: 'date' })
	// birth: Date;

	@CreateDateColumn({ type: 'datetime' })
	joined: Date;

	// @Column({ type: 'varchar', length: 200 })
	// description: string;

	@Column({ type: 'int', default: 4 })
	privilege: number;

	// @Column({ type: 'varchar', length: 200 })
	// salt: string;

	@OneToMany(() => HistoryEntity, (history) => history.user)
	histories: History[];
}
