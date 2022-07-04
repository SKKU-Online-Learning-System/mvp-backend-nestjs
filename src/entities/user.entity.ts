import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, unique: true })
	email: string;

	@CreateDateColumn({ type: 'datetime' })
	joined_at: Date;

	@Column({ type: 'int', default: 4 })
	privilege: number;
}
