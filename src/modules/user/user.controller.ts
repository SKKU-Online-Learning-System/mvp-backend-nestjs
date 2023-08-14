import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { User } from 'src/configs/decorator/user.decorator';
import { RolesGuard } from 'src/configs/guards/roles.guard';
import { ReqUser, Role } from 'src/entities/user.entity';

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

	@Get('isAdmin')
	@UseGuards(RolesGuard([Role.USER]))
    async isAdmin(@User() user: ReqUser): Promise<{ isAdmin: boolean }> {
        const isAdmin = await this.userService.isAdmin(user);
        return { isAdmin };
    }
}
