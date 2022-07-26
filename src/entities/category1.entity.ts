import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Category2Entity } from './category2.entity';

@Entity()
class Category1 {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 30 })
	name: string;

	@OneToMany(() => Category2Entity, (category2) => category2.category1)
	category2s: Category2Entity[];
}

export { Category1 as Category1Entity };
