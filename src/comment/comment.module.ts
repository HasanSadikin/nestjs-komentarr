import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CryptojsService } from 'src/cryptojs/cryptojs.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService, JwtService, CryptojsService],
})
export class CommentModule {}
