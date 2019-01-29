import { MatchService } from './service/match.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchRepository } from './mocks/match.repository';

describe('Match Controller', () => {
  let matchController: MatchController;
  let matchService: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [MatchService,
        {
          provide: 'MatchRepository',
          useValue: MatchRepository,
        },
      ],
    }).compile();

    matchService = module.get<MatchService>(MatchService);
    matchController = module.get<MatchController>(MatchController);
  });

  it('should be defined', () => {
    expect(matchController).toBeDefined();
  });

  describe('find', () => {
    it('should find Matches', async () => {
      const result = {
        player1: {
          id: 1,
          wins: 4,
        },
        player2: {
          id: 2,
          wins: 8,
        },
      };

      jest.spyOn(matchService, 'getMatches').mockImplementation(() => result);
      expect(await matchController.findMatches({ id1: 1, id2: 2 })).toBe(result);
    });
  });

  describe('find', () => {
    it('should save a Match', async () => {
      const result = {
        winnerPlayer: 6,
        loserPlayer: 4,
        id: 13,
        createdAt: '2019-01-28T01:18:14.415Z',
      };

      jest.spyOn(matchService, 'saveMatch').mockImplementation(() => result);
      expect(await matchController.saveMatch({body: {winnerPlayer: 6, loserPlayer: 4}})).toBe(result);
    });
  });

  describe('find', () => {
    it('should get matches with details', async () => {
      const result = {
        page: 2,
        pageCount: 2,
        data: [],
      };

      jest.spyOn(matchService, 'getDetailedMatches').mockImplementation(() => result);
      expect(await matchController.matchesDetail({id1: 1, id2: 2, page: 2})).toBe(result);
    });
  });
});
