import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User_Course {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({ type: 'int' })
	userId!: number;

	@Column({ type: 'int' })
	courseId!: number;

	@Column({ type: 'boolean', default: false })
	status!: boolean;
}
