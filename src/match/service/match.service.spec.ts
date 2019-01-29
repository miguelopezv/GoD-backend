import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { MatchRepository } from '../mocks/match.repository';
import { Match } from '../entity/match.entity';

class MockMatchService {
  getMatches(id1: number, id2: number): Promise<object> {
    const result = {
      player1: { id: 1, wins: 4 },
      player2: { id: 2, wins: 8 },
    };

    return new Promise<object>((resolve) => {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    });
  }

  saveMatch(body: any): Promise<Match> {
    const result =  {winnerPlayer: 6, loserPlayer: 4, id: 13, createdAt: new Date()};

    return new Promise<Match>(resolve => {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    });
  }

  getDetailedMatches(id1: number, id2: number, page: number): Promise<object> {
    const result = { page: 2, pageCount: 2, data: [] };

    return new Promise<object>(resolve => {
      setTimeout(() => {
        resolve(result);
      }, 1000);
    });

  }
}

let mockService: MockMatchService;
describe('MatchService', () => {

  beforeEach(async () => {
    mockService = new MockMatchService();
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchService, {
        provide: 'MatchRepository',
        useValue: MatchRepository,
      }],
    }).compile();

  });

  it('should be defined', () => {
    expect(mockService).toBeDefined();
  });

  it('should return Matches', async () => {
    const result = {
      player1: { id: 1, wins: 4 },
      player2: { id: 2, wins: 8 },
    };

    mockService.getMatches(1, 2).then(res => {
      expect(res).toEqual(result);
    });
  });

  it('should be save a match', async () => {
    const result = {
      winnerPlayer: 6,
      loserPlayer: 4,
      id: 13,
      createdAt: new Date(),
    };

    mockService.saveMatch({ body: { winnerPlayer: 6, loserPlayer: 4 } }).then(res =>{
      expect(res).toEqual(result);
    });
  });

  it('should return detailed matches', async () => {
    const result = {
      page: 2,
      pageCount: 2,
      data: [],
    };

    mockService.getDetailedMatches(1, 2, 2).then(res => {
      expect(res).toEqual(result);
    });
  });
});
