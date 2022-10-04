import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Banner {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 300, nullable: true }) // TODO nullable false
	filename: string;

	@Column({ nullable: true })
	courseId: number;

	@Column({ nullable: true })
	category1Id: number;

	@Column({ nullable: true })
	category2Id: number;

	@Column({ default: true })
	isActive: boolean;
}
