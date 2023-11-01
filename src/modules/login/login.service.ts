import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { HttpResponse, status } from 'src/configs/etc/http-response.config';
import { getRepository } from 'typeorm';
import { ReqUser, Role, UserEntity } from 'src/entities/user.entity';

@Injectable()
export class LoginService {
  constructor(
		private jwtService: JwtService,
		private userService: UserService,
		// private adminService: AdminService,
	) {}

  // signup
	async signup(createUserDto: CreateUserDto): Promise<UserEntity | null> {
		const user = await this.userService.createUser(createUserDto);
		if (user) return user;
		else return null;
	}

  async localLogin(res: Response, user:ReqUser): Promise<HttpResponse> {
    const { id, st_id, st_name, st_degree, st_status, st_dept, role } = user;
		
    // UserEntity에서 사용자를 찾습니다.
    const userRepository = getRepository(UserEntity);
    let existingUser = await userRepository.findOne({ where: { st_id: st_id } });

    // 사용자가 존재하지 않는 경우 새로운 사용자 생성
    if (!existingUser) {
        existingUser = userRepository.create({
            st_id,
            st_name,
            st_degree,
            st_status,
            st_dept,
            role,
        });
        await userRepository.save(existingUser);
    }
    const payload = { id, st_id, st_name, st_degree, st_status, st_dept, role };
		const token = this.jwtService.sign(payload);
		res.cookie('Authorization', token, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
		});
		return status(200);
	}


  create(createLoginDto: CreateLoginDto) {
    return 'This action adds a new login';
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
