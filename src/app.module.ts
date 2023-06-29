import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kurraomsairam2:%40Bhi1998@cluster0.1wdufo0.mongodb.net/web?retryWrites=true&w=majority&authMechanism=DEFAULT',
    ),
    UserModule,
    AuthModule,
  ],
  controllers: [AuthController, UserController],
  providers: [AppService],
})
export class AppModule {}
