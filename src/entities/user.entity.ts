import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

export enum Privilege {
	ADMIN = 1,
	INSTRUCTOR,
	TA,
	STUDENT,
}

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
