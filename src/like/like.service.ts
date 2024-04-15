import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService) {}

  async getLike(commentId: string) {
    return this.prismaService.like.findMany({
      where: {
        commentId: commentId,
      },
    });
  }

  async getDislike(commentId: string) {
    return this.prismaService.dislike.findMany({
      where: {
        commentId: commentId,
      },
    });
  }

  async like(userId: string, commentId: string) {
    const alreadyLiked = await this.prismaService.like.findFirst({
      where: {
        userId: userId,
        commentId: commentId,
      },
    });

    if (alreadyLiked) {
      throw new ConflictException();
    }

    return this.prismaService.like.create({
      data: {
        userId: userId,
        commentId: commentId,
      },
    });
  }

  async unlike(userId: string, commentId: string) {
    const alreadyUnliked = await this.prismaService.like.findFirst({
      where: {
        userId: userId,
        commentId: commentId,
      },
    });

    if (!alreadyUnliked) {
      throw new ConflictException();
    }

    return this.prismaService.like.deleteMany({
      where: {
        userId: userId,
        commentId: commentId,
      },
    });
  }

  async dislike(userId: string, commentId: string) {
    const alreadyDisliked = await this.prismaService.dislike.findFirst({
      where: {
        userId: userId,
        commentId: commentId,
      },
    });

    if (alreadyDisliked) {
      throw new ConflictException();
    }

    return this.prismaService.dislike.create({
      data: {
        userId: userId,
        commentId: commentId,
      },
    });
  }

  async undislike(userId: string, commentId: string) {
    const alreadyUndisliked = await this.prismaService.dislike.findFirst({
      where: {
        userId: userId,
        commentId: commentId,
      },
    });

    if (!alreadyUndisliked) {
      throw new ConflictException();
    }

    return this.prismaService.dislike.deleteMany({
      where: {
        userId: userId,
        commentId: commentId,
      },
    });
  }
}
