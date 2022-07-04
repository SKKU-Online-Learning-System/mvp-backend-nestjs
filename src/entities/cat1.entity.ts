import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cat1Entity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 20 })
	name: string;
}
