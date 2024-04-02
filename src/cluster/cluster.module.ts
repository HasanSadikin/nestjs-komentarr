import { Module } from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ClusterController } from './cluster.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { OtpService } from 'src/otp/otp.service';
import { CryptojsService } from 'src/cryptojs/cryptojs.service';

@Module({
  imports: [],
  controllers: [ClusterController],
  providers: [
    OtpService,
    CryptojsService,
    ClusterService,
    PrismaService,
    JwtService,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ClusterModule {}
