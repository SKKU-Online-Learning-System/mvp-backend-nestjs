import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ReqUser } from 'src/entities/user.entity';

export const User = createParamDecorator(
	(data: string, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		const user = request.user;

		return data ? user?.[data] : user;
	},
);
