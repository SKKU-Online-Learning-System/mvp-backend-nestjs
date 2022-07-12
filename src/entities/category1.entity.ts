import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Category1 {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 30 })
	name: string;
}

export { Category1 as Category1Entity };
