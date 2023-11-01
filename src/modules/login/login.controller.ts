import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards, Query } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { Response } from 'express';
import { ReqUser } from 'src/entities/user.entity';
import { User } from 'src/configs/decorator/user.decorator';
import { UserService } from '../user/user.service';
import { LocalAuthGuard } from '../../configs/guards/local-auth.guard';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(
    private loginService: LoginService,
    private userService: UserService,
  ) {}

  @Post()
  //@UseGuards(LocalAuthGuard)
  async login(@Res({ passthrough: true }) res: Response, @Query() user: ReqUser) {
    return this.loginService.localLogin(res, user);
  }

  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }

  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
