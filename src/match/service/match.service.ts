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

  async getMatchs(id1: number, id2: number): Promise<object> {
    const player1 = await this.matchRepository.count({where: {winnerPlayer: id1}});
    const player2 = await this.matchRepository.count({where: {winnerPlayer: id2}});

    return JSON.parse(`{"player1": ${player1}, "player2": ${player2}}`);
  }

  async saveMatch(data: any): Promise<Match> {
    return await this.matchRepository.save(data);
  }
}
