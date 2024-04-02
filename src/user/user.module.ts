import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CryptojsService } from 'src/cryptojs/cryptojs.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, CryptojsService],
})
export class UserModule {}
