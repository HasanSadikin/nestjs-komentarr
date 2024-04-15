import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getNestedComments_One(clusterId: string, scope: string) {
    return this.prisma.comment.findMany({
      where: {
        clusterId: clusterId,
        parentId: null,
        scope: scope,
      },
      include: {
        replies: {
          include: {
            likes: true,
            dislikes: true,
          },
        },
        likes: true,
        dislikes: true,
      },
    });
  }

  async getNestedComments_Two(clusterId: string, scope: string) {
    return this.prisma.comment.findMany({
      where: {
        clusterId: clusterId,
        parentId: null,
        scope: scope,
      },
      include: {
        replies: {
          include: {
            replies: {
              include: {
                likes: true,
                dislikes: true,
              },
            },
            likes: true,
            dislikes: true,
          },
        },
        likes: true,
        dislikes: true,
      },
    });
  }

  async getDepth(commentId: string) {
    let parentId = commentId;
    let depth = 0;

    if (!parentId) return depth;

    do {
      const found = await this.prisma.comment.findFirst({
        where: {
          id: parentId,
        },
      });

      if (found) {
        depth++;
        parentId = found.parentId;
      }
    } while (parentId);

    return depth;
  }

  async getNestedComments_Three(clusterId: string, scope: string) {
    return this.prisma.comment.findMany({
      where: {
        clusterId: clusterId,
        parentId: null,
        scope: scope,
      },
      include: {
        replies: {
          include: {
            replies: {
              include: {
                replies: {
                  include: {
                    likes: true,
                    dislikes: true,
                  },
                },
                likes: true,
                dislikes: true,
              },
            },
            likes: true,
            dislikes: true,
          },
        },
        likes: true,
        dislikes: true,
      },
    });
  }

  async getComment(id: string) {
    return this.prisma.comment.findFirst({
      where: {
        id: id,
      },
    });
  }

  async postComment(
    clusterId: string,
    comment: {
      parentId?: string;
      authorId: string;
      content: string;
      scope: string;
    },
  ) {
    return this.prisma.comment.create({
      data: {
        parentId: comment.parentId,
        authorId: comment.authorId,
        clusterId: clusterId,
        content: comment.content,
        scope: comment.scope,
      },
    });
  }

  async updateComment(id: string, content: string) {
    return this.prisma.comment.update({
      where: {
        id: id,
      },
      data: {
        content: content,
      },
    });
  }

  async deleteComment(id: string) {
    return this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
  }
}
