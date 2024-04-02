import { Injectable, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/api-key/api-key.guard';
import { PrismaService } from 'src/prisma.service';

@Injectable()
@UseGuards(ApiKeyGuard)
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.comment.findMany({
      select: {
        authorId: true,
      },
      distinct: ['authorId'],
    });

    return users.map((x) => {
      return x.authorId;
    });
  }
}
