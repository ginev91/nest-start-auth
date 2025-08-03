/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from 'src/guards/passport-local.guard';
import { PassportJwtGuard } from 'src/guards/passport-jwt.guard';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Request() request) {
    return this.authService.signIn(request.user);
  }

  @Get('me')
  @UseGuards(PassportJwtGuard)
  getUserInfo(@Request() request) {
    return request.user;
  }
}
