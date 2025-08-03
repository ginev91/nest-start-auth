import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

type AuthInput = {
  username: string;
  password: string;
};
type SignInData = {
  userId: number;
  username: string;
};
type AuthResult = SignInData & {
  accessToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult | null> {
    const user = await this.validateUser(input);
    if (user) {
      return this.signIn(user);
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.usersService.findUserByUsername(input.username);
    if (user && user.password === input.password) {
      return {
        userId: user.userId,
        username: user.username,
      };
    }
    return null;
  }

  signIn(user: SignInData): AuthResult {
    const payload = { username: user.username, sub: user.userId };
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const accessToken = this.jwtService.sign(payload);
    return {
      ...user,
      accessToken,
    };
  }
}
