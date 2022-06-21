import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat2 {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 20 })
	name: string;

	@Column({ type: 'int' })
	cat1_id: number;
}
