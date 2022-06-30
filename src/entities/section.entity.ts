import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Section {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 100 })
	title: string;

	@Column({ type: 'int' })
	course_id: number;
}

export { Section as SectionEntity };
