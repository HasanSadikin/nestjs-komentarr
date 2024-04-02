import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClusterService } from './cluster.service';
import { ApiKeyGuard } from 'src/api-key/api-key.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('api/v1/cluster')
export class ClusterController {
  constructor(private readonly clusterService: ClusterService) {}

  @Post()
  async createCluster(@Body() postData: { authorId: string; name: string }) {
    return this.clusterService.createCluster(postData.authorId, postData.name);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  async deleteCluster(@Param('id') id: string) {
    return this.clusterService.deleteCluster(id);
  }
}
