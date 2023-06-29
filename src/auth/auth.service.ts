import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { createHash } from 'crypto';
import { UserDocument } from 'src/user/entities/user-entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.passwordHash === pass) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(auth: any) {
    const givenPasswordEncrypted = createHash('sha256')
      .update(String(auth.password))
      .digest('base64');
    const foundUser = await this.userService.findByQuery({
      username: auth.username,
    });

    if (foundUser && foundUser.length == 1) {
      const dbUser = foundUser[0] as UserDocument;
      const dbPassword = dbUser.passwordHash;
      if (dbPassword === givenPasswordEncrypted) {
        const payload = {
          username: dbUser['username'],
          mobile: dbUser['mobile'],
          userType: dbUser['userType'],
          userId: dbUser['_id'],
        };
        return {
          access_token: this.jwtService.sign(
            JSON.parse(JSON.stringify(payload)),
          ),
        };
      } else {
        return {
          message: 'Unauthorized',
        };
      }
    } else if (foundUser.length == 0) {
      return {
        message: 'User not found',
      };
    } else {
      return {
        message: 'Login Failed',
      };
    }
  }
}
