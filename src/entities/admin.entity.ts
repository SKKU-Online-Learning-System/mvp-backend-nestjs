import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Admin {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 30, unique: true })
	username: string;

	@Column({ type: 'varchar', length: 200 })
	password: string;

	@Column({ type: 'varchar', length: 200 })
	salt: string;
}

export { Admin as AdminEntity };
