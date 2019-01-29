import { PlayerRepository } from './mocks/player.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from './player.controller';
import { PlayerService } from './service/player.service';

describe('PlayerController', () => {
  let playerController: PlayerController;
  let playerService: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [PlayerService, {
        provide: 'PlayerRepository',
        useValue: PlayerRepository,
      }],
    }).compile();

    playerService = module.get<PlayerService>(PlayerService);
    playerController = module.get<PlayerController>(PlayerController);
  });

  it('should be defined', () => {
    expect(playerController).toBeDefined();
  });

  describe('find', () => {
    it('should return a Player', async () => {
      const result = {
        id: 4,
        firstName: 'Miguel',
        lastName: 'Lopez',
        wonMatches: [],
        losedMatches: [],
      };

      jest.spyOn(playerService, 'findPlayer').mockImplementation(() => result);
      expect(await playerController.find({firstName: 'Miguel', lastName: 'Lopez'})).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new Player', async () => {
      const result = {
        id: 11,
        firstName: 'Zelda',
        lastName: 'Lopez',
      };

      jest.spyOn(playerService, 'save').mockImplementation(() => result);
      expect(await playerController.create({ firstName: 'Zelda', lastName: 'Lopez' })).toBe(result);
    });
  });
});
