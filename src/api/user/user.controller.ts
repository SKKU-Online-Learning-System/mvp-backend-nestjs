import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('/users')
@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}
}
