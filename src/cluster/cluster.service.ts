import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from 'src/otp/otp.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClusterService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private otp: OtpService,
  ) {}

  async createCluster(authorId: string, name: string) {
    const cluster = await this.prisma.commentCluster.create({
      data: {
        secret: this.otp.generateOtp(),
        authorId: authorId,
        name: name,
      },
    });

    return cluster;

    // return this.prisma.commentCluster.update({
    //   where: {
    //     id: cluster.id,
    //   },
    //   data: {
    //     key: key,
    //   },
    // });
  }

  async deleteCluster(id: string) {
    return this.prisma.commentCluster.delete({
      where: {
        id: id,
      },
    });
  }
}
