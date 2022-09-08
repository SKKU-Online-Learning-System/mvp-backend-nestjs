import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReqUser, Role } from 'src/entities/user.entity';

export const RolesGuard = (roles?: Role[]): CanActivate => {
	class RolesGuardMixin extends AuthGuard('jwt') {
		async canActivate(context: ExecutionContext): Promise<boolean> {
			await super.canActivate(context);

			if (!roles || roles.length === 0) return true;

			if (roles.includes(Role.USER))
				roles = [Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT];

			const request = context.switchToHttp().getRequest();
			const user: ReqUser = request.user;

			return this.matchRoles(roles, user.role);
		}

		matchRoles(roles: Role[], userRole: Role): boolean {
			return roles.includes(userRole);
		}
	}

	const guard = mixin(RolesGuardMixin);
	return new guard();
};
