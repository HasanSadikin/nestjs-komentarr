import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { ClusterModule } from './cluster/cluster.module';
import { LikeModule } from './like/like.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        // ttl: 1000 * 60 * 15,
        ttl: 0,
        limit: 100,
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
