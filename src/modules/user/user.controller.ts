import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	getAllUsers() {
		return this.userService.getAllUsers();
	}

	@Put(':userId')
	updateUserById(
		@Param('userId') userId: number,
		@Body() updateUserDto: UpdateUserDto,
	) {
		return this.userService.updateUserById(userId, updateUserDto);
	}
}
