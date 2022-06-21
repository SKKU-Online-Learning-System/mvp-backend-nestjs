import internal from 'stream';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ type: 'varchar', length: 50 })
	email: string;

	@Column({ type: 'varchar', length: 200 })
	password: string;

	@Column({ type: 'varchar', length: 20 })
	name: string;

	@Column({ type: 'bool' })
	sex: boolean;

	@Column({ type: 'varchar', length: 20 })
	phone: string;

	@Column({ type: 'date' })
	birth: Date;

	@Column({ type: 'datetime' })
	joined: Date;

	@Column({ type: 'varchar', length: 200 })
	description: string;

	@Column({ type: 'int' })
	privilege: number;

	@Column({ type: 'varchar', length: 200 })
	salt: string;
}
