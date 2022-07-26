import {
	BadRequestException,
	Injectable,
	NotImplementedException,
} from '@nestjs/common';
import { HashtagEntity } from 'src/entities/hashtag.entity';
import { DataSource } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { DeleteHashtagDto } from './dto/delete-hashtag.dto';
import { GetHashtagDto } from './dto/get-hashtag.dto';

@Injectable()
export class HashtagService {
	constructor(private dataSource: DataSource) {}

	async getHashtags() {
		return await this.dataSource.getRepository(HashtagEntity).find();
	}

	async getHashtagById(getHashtagDto: GetHashtagDto) {
		const { hashtagId } = getHashtagDto;

		return await this.dataSource.getRepository(HashtagEntity).find({
			where: {
				id: hashtagId,
			},
		});
	}

	async createHashtag(createHashtagDto: CreateHashtagDto) {
		const { tag } = createHashtagDto;

		const {
			raw: { affectedRows },
		} = await this.dataSource.getRepository(HashtagEntity).insert({ tag });

		if (!affectedRows) throw new NotImplementedException();

		return { statusCode: 201, message: 'OK' };
	}

	async deleteHashtagById(deleteHashtagDto: DeleteHashtagDto) {
		const { hashtagId } = deleteHashtagDto;

		const [hashtag] = await this.getHashtagById(deleteHashtagDto);
		if (!hashtag) throw new BadRequestException();

		const { affected } = await this.dataSource
			.getRepository(HashtagEntity)
			.delete(hashtagId);

		if (!affected) throw new NotImplementedException();

		return { statusCode: 200, message: 'OK' };
	}
}
