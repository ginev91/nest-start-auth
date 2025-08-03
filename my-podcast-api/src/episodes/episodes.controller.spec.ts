import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { ConfigModule } from '../config/config.module';
import { EpisodesService } from './episodes.service';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockEpisodesService = {
    findAll: jest.fn(),
    findFeatured: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [
        {
          provide: EpisodesService,
          useValue: mockEpisodesService,
        },
      ],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an episode by id', async () => {
      const mockEpisode = { id: '1', name: 'Test Episode' };
      mockEpisodesService.findOne.mockResolvedValue(mockEpisode);

      const result = await controller.findOne('1');
      expect(result).toEqual(mockEpisode);
      expect(mockEpisodesService.findOne).toHaveBeenCalledWith('1');
    });
  });
});
