import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, unique: true })
	email: string;

	@CreateDateColumn()
	joinedAt: Date;

	@Column({ default: 4 })
	privilege: number;
}

export { User as UserEntity };
