import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/entities/user.entity';

export const RolesGuard = (roles?: Role[]): CanActivate => {
	class RolesGuardMixin extends AuthGuard('jwt') {
		async canActivate(context: ExecutionContext): Promise<boolean> {
			await super.canActivate(context);

			if (!roles || roles.length === 0) return true;

			if (roles.includes(Role.USER))
				roles.push(Role.ADMIN, Role.INSTRUCTOR, Role.STUDENT);

			const request = context.switchToHttp().getRequest();
			const user = request.user;

			return this.matchRoles(roles, user.privilege);
		}

		matchRoles(roles: Role[], userRole: Role): boolean {
			return roles.includes(userRole);
		}
	}

	const guard = mixin(RolesGuardMixin);
	return new guard();
};
