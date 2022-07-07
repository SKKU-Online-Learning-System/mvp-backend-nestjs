import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Hashtag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 20 })
	tag: string;
}

export { Hashtag as HashtagEntity };
