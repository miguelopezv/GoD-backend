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

    return {player1: {id: +id1, wins: player1wins}, player2: {id: +id2, wins: player2wins}};
  }

  async saveMatch(data: any): Promise<Match> {
    return await this.matchRepository.save(data);
  }

  async getDetailedMatches(id1: number, id2: number, page: number): Promise<object> {
    const matches = await this.matchRepository.find({
      where: [
        { winnerPlayer: id1, loserPlayer: id2 },
        { winnerPlayer: id2, loserPlayer: id1 },
      ],
      relations: ['winnerPlayer', 'loserPlayer'],
    });

    const pageCount = Math.ceil(matches.length / 10);
    if (!page) { page = 1; }
    if (page > pageCount) {page = pageCount; }
    const data = matches.slice(page * 10 - 10, page * 10);

    return await {page: +page, pageCount, data};
  }
}
