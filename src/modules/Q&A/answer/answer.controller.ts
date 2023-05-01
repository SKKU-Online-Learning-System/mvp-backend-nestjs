import {
	Body,
	Controller,
	Delete,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/configs/decorator/user.decorator';
import { ReqUser, Role } from 'src/entities/user.entity';
import { RolesGuard } from '../../../configs/guards/roles.guard';
import { AnswerService } from './answer.service';
import { ApiAnswer } from './answer.swagger';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@ApiTags('Answer')
@Controller('answers')
export class AnswerController {
	constructor(private readonly answerService: AnswerService) {}

	@Post()
	@UseGuards(RolesGuard([Role.USER]))
	@ApiAnswer.create
	create(@Body() dto: CreateAnswerDto, @User() user: ReqUser) {
		return this.answerService.create(dto, user);
	}

	@Put(':answerId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiAnswer.update
	update(
		@Param('answerId') answerId: number,
		@Body() dto: UpdateAnswerDto,
		@User() user: ReqUser,
	) {
		return this.answerService.update(answerId, dto, user);
	}

	@Delete(':answerId')
	@UseGuards(RolesGuard([Role.USER]))
	@ApiAnswer.delete
	delete(@Param('answerId') answerId: number, @User() user: ReqUser) {
		return this.answerService.delete(answerId, user);
	}
}
