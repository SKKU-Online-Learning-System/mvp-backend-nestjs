import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Admin {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 30, unique: true })
	username: string;

	@Column({ type: 'varchar', length: 60 })
	password: string;
}

export { Admin as AdminEntity };
