import { ReqUser, Role } from 'src/entities/user.entity';

export function isAdmin(user: ReqUser): boolean {
	return user.role === Role.ADMIN;
}

export function isAuthor(target: any, user: ReqUser): boolean {
	if (target) {
		if (target.authorId === user.id) return true;
		else {
			if (user.role === Role.ADMIN) return true;
			else return false;
		}
	} else {
		return false;
	}
}
