/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { Episode } from './entity/episode.entity';
import { CreateEpisodeDto } from '../dto/create-episode.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EpisodesService {
  private episodes: Episode[] = [];

  async findAll(
    sort: 'asc' | 'desc' = 'asc',
    limit: number = 100,
  ): Promise<Episode[]> {
    const sortAsc = (a: Episode, b: Episode) => (a.name > b.name ? 1 : -1);
    const sortDesc = (a: Episode, b: Episode) => (a.name < b.name ? 1 : -1);

    return this.episodes
      .sort(sort === 'asc' ? sortAsc : sortDesc)
      .slice(0, limit);
  }

  async findFeatured() {
    return this.episodes.filter((episode) => episode.featured);
  }

  async findOne(id: string) {
    return this.episodes.find((episode) => episode.id === id);
  }

  async create(episode: CreateEpisodeDto) {
    const newEpisode = {
      ...episode,
      id: randomUUID(),
      featured: episode.featured ?? false,
    };
    this.episodes.push(newEpisode);
    return newEpisode;
  }
}
