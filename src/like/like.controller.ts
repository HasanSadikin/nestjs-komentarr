import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiKeyGuard } from 'src/api-key/api-key.guard';
import { Throttle } from '@nestjs/throttler';

@Controller('api/v1')
@UseGuards(ApiKeyGuard)
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('like/:clusterId/:commentId')
  async like(
    @Param('commentId') commentId: string,
    @Body() postData: { userId: string },
  ) {
    return this.likeService.like(postData.userId, commentId);
  }

  @Get('like/:clusterId/:commentId')
  async getLike(@Param('commentId') commentId: string) {
    return this.likeService.getLike(commentId);
  }

  @Get('dislike/:clusterId/:commentId')
  async getDislike(@Param('commentId') commentId: string) {
    return this.likeService.getDislike(commentId);
  }

  @Delete('like/:clusterId/:commentId')
  async unlike(
    @Param('commentId') commentId: string,
    @Body() postData: { userId: string },
  ) {
    return this.likeService.unlike(postData.userId, commentId);
  }

  @Post('dislike/:clusterId/:commentId')
  async dislike(
    @Param('commentId') commentId: string,
    @Body() postData: { userId: string },
  ) {
    return this.likeService.dislike(postData.userId, commentId);
  }

  @Delete('dislike/:clusterId/:commentId')
  async undislike(
    @Param('commentId') commentId: string,
    @Body() postData: { userId: string },
  ) {
    return this.likeService.undislike(postData.userId, commentId);
  }
}
