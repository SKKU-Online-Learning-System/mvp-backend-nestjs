import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HashtagEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 20 })
	tag: string;
}
