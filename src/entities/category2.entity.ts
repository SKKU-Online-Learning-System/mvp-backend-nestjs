import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category1Entity } from './category1.entity';

@Entity()
class Category2 {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 30 })
	name: string;

	@ManyToOne(() => Category1Entity, (category1) => category1.category2s)
	category1: Category1Entity;
	@Column()
	category1Id: number;
}

export { Category2 as Category2Entity };
