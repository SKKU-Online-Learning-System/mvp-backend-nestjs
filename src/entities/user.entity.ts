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
	MANAGER = 2,
	STUDENT = 3,
	USER = 4,
	NOT_LOGGED_IN = 5,
}

export interface ReqUser {
	id: number;
	//email: string;
	//nickname: string;
	st_id: string;
	st_name: string;
	st_degree: string;
	st_status: string;
	st_dept: string;
	role: Role;
}

@Entity()
class User {
	@PrimaryGeneratedColumn()
	id: number;

	// @Column({ type: 'varchar', length: 50, unique: true })
	// email: string;

	// @Column({ type: 'varchar', length: 20, unique: true })
	// nickname: string;

	@Column({ type: 'varchar', length: 20, unique: true })
	st_id: string;

	@Column({ type: 'varchar', length: 20 })
	st_name: string;

	@Column({ type: 'varchar', length: 20 })
	st_degree: string;

	@Column({ type: 'varchar', length: 20 })
	st_status: string;

	@Column({ type: 'varchar', length: 20, default: '소프트웨어학과' })
	st_dept: string;

	@CreateDateColumn()
	joinedAt: Date;

	@Column({ default: 3 })
	role: number;

	// @OneToMany(() => CourseEntity, (course) => course.instructor)
	// courses: CourseEntity[];

	@Column({default: 0})
	watchedLecturesCount: number;

	@Column({default: 0})
	commentsCount: number
}

export { User as UserEntity };
