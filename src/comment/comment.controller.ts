import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiKeyGuard } from 'src/api-key/api-key.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('api/v1/comment')
@UseGuards(ApiKeyGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @SkipThrottle()
  @Get('cluster/:clusterId/:nested')
  async getAllComments(
    @Param('clusterId') clusterId: string,
    @Param('nested', ParseIntPipe) nested: number,
    @Query('scope') scope: string,
  ) {
    switch (nested) {
      case 2:
        return this.commentService.getNestedComments_Two(clusterId, scope);
      case 3:
        return this.commentService.getNestedComments_Three(clusterId, scope);
      case 1:
      default:
        return this.commentService.getNestedComments_One(clusterId, scope);
    }
  }

  @SkipThrottle()
  @Get(':clusterId/:id')
  async getComment(@Param('id') id: string) {
    return this.commentService.getComment(id);
  }

  @Post('cluster/:id/:nested')
  async postComment(
    @Param('id') clusterId: string,
    @Param('nested', ParseIntPipe) nested: number,
    @Body()
    postData: {
      authorId: string;
      parentId?: string;
      content: string;
      scope: string;
    },
  ) {
    const depth = await this.commentService.getDepth(postData.parentId);

    if (depth > nested) {
      throw new HttpException('Reply exceeded nested depth that you set!', 400);
    }

    return this.commentService.postComment(clusterId, postData);
  }

  @Put(':clusterId/:id')
  async updateComment(
    @Param('id') id: string,
    @Body() postData: { content: string },
  ) {
    return this.commentService.updateComment(id, postData.content);
  }

  @Delete(':clusterId/:id')
  async deleteComment(@Param('id') id: string) {
    return this.commentService.deleteComment(id);
  }
}
