import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserCourseDto } from './dto/create-user-course.dto';
import { DeleteUserCourseDto } from './dto/delete-user-course.dto';

@ApiTags('/users')
@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@Get(':userId/courses')
	getUserCourses(@Param('userId') id: number) {
		return this.userService.getUserCourses(id);
	}

	@Post(':userId/courses/:courseId')
	createUserCourse(@Param() createUserCourseDto: CreateUserCourseDto) {
		return this.userService.createUserCourse(createUserCourseDto);
	}

	@Delete(':userId/courses/:courseId')
	deleteUserCourses(@Param() deleteUserCourseDto: DeleteUserCourseDto) {
		return this.userService.deleteUserCourse(deleteUserCourseDto);
	}
}
