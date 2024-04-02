import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CryptojsService } from 'src/cryptojs/cryptojs.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService, PrismaService, JwtService, CryptojsService],
})
export class LikeModule {}
