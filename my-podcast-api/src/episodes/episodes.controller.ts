import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from '../dto/create-episode.dto';
import { IsPositivePipe } from '../pipes/is-positive.pipe';
import { ApiKeyGuard } from '../guards/api-key.guard';

@Controller('episodes')
@UseGuards(ApiKeyGuard) // Applies to all routes in this controller
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}
  @Get()
  findAll(
    @Query('sort') sort: 'asc' | 'desc' = 'asc',
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe)
    limit: number,
  ) {
    return this.episodesService.findAll(sort, limit);
  }

  @Get('featured')
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.episodesService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) input: CreateEpisodeDto) {
    return this.episodesService.create(input);
  }
}
