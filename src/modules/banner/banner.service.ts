import { Injectable } from '@nestjs/common';
import { readdir } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class BannerService {
	async uploadFiles(): Promise<string[]> {
		return await readdir(join(__dirname, '../../../public'));
	}
}
