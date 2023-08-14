import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { CourseEntity } from './course.entity';
import { LectureEntity } from './lecture.entity';
import { UserEntity } from './user.entity';

@Entity()
export class Question {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => UserEntity)
	author: UserEntity;
	@Column()
	authorId: number;

	@ManyToOne(() => CourseEntity)
	course: CourseEntity;
	@Column()
	courseId: number;

	@ManyToOne(() => LectureEntity)
	lecture: LectureEntity;
	@Column({ nullable: true })
	lectureId: number;

	@Column({ type: 'varchar', length: 100 })
	title: string;

	@Column({ type: 'text' })
	contents: string;

	@Column()
	likes: number;

	@ManyToMany(() => UserEntity)
  	@JoinTable()
  	likesByUsers: UserEntity[];

	@CreateDateColumn()
	createdAt: Date;

	@OneToMany(() => Answer, (answer) => answer.question)
	answers: Answer[];
}
