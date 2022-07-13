import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const BPU = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest();
		return { ...request.body, ...request.params, ...request.user };
	},
);
