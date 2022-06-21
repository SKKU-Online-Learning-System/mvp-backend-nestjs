import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
	constructor(private dataSource: DataSource) {}

	home() {
		return {
			title: 'Home',
			description: 'home',
		};
	}
}
