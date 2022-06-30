import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('/lectures')
@Controller('lectures')
export class LectureController {}
