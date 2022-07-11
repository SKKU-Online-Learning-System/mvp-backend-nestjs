import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Cat1 {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 30 })
	name: string;
}

export { Cat1 as Cat1Entity };
