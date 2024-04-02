import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptojsService } from 'src/cryptojs/cryptojs.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
    private readonly crypto: CryptojsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { clusterId } = request.params;

    const foundCluster = await this.prisma.commentCluster.findFirst({
      where: {
        id: clusterId,
      },
    });

    if (!foundCluster) {
      throw new UnauthorizedException();
    }

    const token = this.extractTokenFromHeader(request, foundCluster.secret);

    if (!token || token !== foundCluster.key) {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractTokenFromHeader(request: Request, secret: string): string | undefined {
    const decryptedKey = this.crypto.decrypt(
      request.headers['x-api-key'],
      secret,
    );

    const [type, token] = decryptedKey?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
