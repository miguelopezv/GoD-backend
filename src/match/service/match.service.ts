import { Match } from './../entity/match.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
  ) {}

  async getMatches(id1: number, id2: number): Promise<object> {
    const player1wins = await this.matchRepository.count({where: {winnerPlayer: id1, loserPlayer: id2}});
    const player2wins = await this.matchRepository.count({where: {winnerPlayer: id2, loserPlayer: id1}});

    return JSON.parse(`
    {
      "${id1}": {
        "id": ${id1},
        "wins": ${player1wins}
      },
      "${id2}": {
        "id": ${id2},
        "wins": ${player2wins}
    }}`);
  }

  async saveMatch(data: any): Promise<Match> {
    return await this.matchRepository.save(data);
  }
}
