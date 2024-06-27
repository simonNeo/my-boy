import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { CommonResponseInterceptor } from '../../helper/decorator/CommonResponse.interceptor';
import { NeedLogin } from '../../helper/decorator/NeedLogin.decorator';
import { UID } from '../../helper/decorator/UID.decorator';
import { EditBabyInfoDto, LoginDto, RegisterDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor, CommonResponseInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() dto: RegisterDto) {
    return await this.userService.register(dto);
  }

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.userService.login(dto);
  }

  @Get('/info')
  @NeedLogin
  async info(@UID() uid: number) {
    return await this.userService.userInfo(uid);
  }

  @Post('/edit/baby/info')
  @NeedLogin
  async editBabyInfo(@UID() uid: number, @Body() dto: EditBabyInfoDto) {
    return await this.userService.editBabyInfo(uid, dto);
  }
}
