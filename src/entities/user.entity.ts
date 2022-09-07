import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';

export enum Role {
	ADMIN = 1,
	INSTRUCTOR,
	STUDENT,
	USER,
	NOT_LOGGED_IN,
}

export interface ReqUser {
	id: number;
	email: string;
	nickname: string;
	role: Role;
}

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50, unique: true })
	email: string;

	@Column({ type: 'varchar', length: 20, unique: true })
	nickname: string;

	@CreateDateColumn()
	joinedAt: Date;

	@Column({ default: 3 })
	Role: number;

	@OneToMany(() => CourseEntity, (course) => course.instructor)
	courses: CourseEntity[];
}

export { User as UserEntity };
