import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DataSeeding implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`INSERT INTO cat1(name) VALUES('testname')`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
