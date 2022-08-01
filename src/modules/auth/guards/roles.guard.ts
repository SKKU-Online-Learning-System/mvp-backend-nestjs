import {
	Injectable,
	CanActivate,
	ExecutionContext,
	mixin,
} from '@nestjs/common';
import { Privilege } from 'src/entities/user.entity';

export const RolesGuard = (roles: Privilege[]): CanActivate => {
	@Injectable()
	class RolesGuardMixin implements CanActivate {
		async canActivate(context: ExecutionContext): Promise<boolean> {
			if (!roles || roles.length === 0) {
				return true;
			}
			const request = context.switchToHttp().getRequest();
			const user = request.user;

			return this.matchRoles(roles, user.role);
		}

		matchRoles(privilegedRoles: Privilege[], userRole: number): boolean {
			return privilegedRoles.includes(userRole);
		}
	}

	const guard = mixin(RolesGuardMixin);
	return new guard();
};
