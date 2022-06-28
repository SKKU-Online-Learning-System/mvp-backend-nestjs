import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
} from '@nestjs/common';
import { identity } from 'rxjs';
import { AddUserCourseDto } from './add-user-course.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get('/:userId/courses')
	getUserCourses(@Param('userId', ParseIntPipe) userId: number) {
		return this.userService.getUserCourses(userId);
	}

	@Post('/:userId/courses')
	addUserCourses(
		@Param('userId') userId: number,
		@Body() userCourseDto: AddUserCourseDto,
	) {
		return this.userService.addUserCourses({
			...userCourseDto,
			userId: userId,
		});
	}

	@Delete(':userId/courses/:courseId')
	deleteUserCourses(
		@Param('userId', ParseIntPipe) userId: number,
		@Param('courseId', ParseIntPipe) courseId: number,
	) {
		return this.userService.deleteUserCourses(userId, courseId);
	}
}
