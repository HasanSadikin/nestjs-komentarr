import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { ClusterModule } from './cluster/cluster.module';
import { LikeModule } from './like/like.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { OtpService } from './otp/otp.service';
import { CryptojsService } from './cryptojs/cryptojs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 5000,
        limit: 1,
      },
    ]),
    CommentModule,
    ClusterModule,
    LikeModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
