import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from './player.service';
import { PlayerRepository } from '../mocks/player.repository';
import { Player } from '../entity/player.entity';

class MockPlayerService {
  findPlayer({ firstName, lastName }): Promise<Player> {
    return new Promise<Player>((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    });
  }

  save({ firstName, lastName }): Promise<Player> {
    return new Promise<Player>((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    });
  }
}

const result: Player = {
  id: 1,
  firstName: 'Miguel',
  lastName: 'Lopez',
  wonMatches: [],
  losedMatches: [],
};

let mockService: MockPlayerService;
describe('PlayerService', () => {

  beforeEach(async () => {
    mockService = new MockPlayerService();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: 'PlayerRepository',
          useValue: PlayerRepository,
        },
      ],
    }).compile();

  });

  it('should be defined', () => {
    expect(mockService).toBeDefined();
  });

  it('should find a player', async () => {
    mockService.findPlayer({firstName: 'Miguel', lastName: 'Lopez'}).then(res => {
      expect(res).toEqual(result);
    });
  });

  it('should save a player', async () => {
    mockService.save({ firstName: 'Miguel', lastName: 'Lopez' }).then(res => {
      expect(res).toEqual(result);
    });
  });
});
