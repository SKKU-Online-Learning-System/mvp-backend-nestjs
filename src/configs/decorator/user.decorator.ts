import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ReqUser } from 'src/entities/user.entity';

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        // console.log(request);  // 여기에 요청 객체 로깅
        const user = request.user;
        // console.log(user);  // 여기에 user 객체 로깅

        return data ? user?.[data] : user;
    },
);