import {
	Injectable,
	CanActivate,
	ExecutionContext,
	mixin,
} from '@nestjs/common';
import { Privilege } from 'src/entities/user.entity';

export const RolesGuard = (privileges: Privilege[]): CanActivate => {
	@Injectable()
	class RolesGuardMixin implements CanActivate {
		async canActivate(context: ExecutionContext): Promise<boolean> {
			if (!privileges || privileges.length === 0) {
				return true;
			}
			const request = context.switchToHttp().getRequest();
			const user = request.user;

			return this.matchRoles(privileges, user.privilege);
		}

		matchRoles(privileges: Privilege[], userPrivilege: number): boolean {
			return privileges.includes(userPrivilege);
		}
	}

	const guard = mixin(RolesGuardMixin);
	return new guard();
};
