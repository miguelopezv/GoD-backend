import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match } from '../interfaces/match.interface';
import { CreateMatchDto } from '../dto/create-match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel('Match')
    private readonly matchModel: Model<Match>,
  ) {}

  async getMatches(id1: number, id2: number): Promise<object> {
    const player1wins = await this.matchModel.count({
      winnerPlayer: id1,
      loserPlayer: id2,
    });
    const player2wins = await this.matchModel.count({
      winnerPlayer: id2,
      loserPlayer: id1,
    });

    return {
      player1: { id: +id1, wins: player1wins },
      player2: { id: +id2, wins: player2wins },
    };
  }

  async saveMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    const newMatch = new this.matchModel(createMatchDto);
    return await newMatch.save();
  }

  async getDetailedMatches(
    id1: number,
    id2: number,
    page: number,
  ): Promise<object> {
    const matches = await this.matchModel.find({
      where: [
        { winnerPlayer: id1, loserPlayer: id2 },
        { winnerPlayer: id2, loserPlayer: id1 },
      ],
      relations: ['winnerPlayer', 'loserPlayer'],
    });

    const pageCount = Math.ceil(matches.length / 10);
    if (!page) {
      page = 1;
    }
    if (page > pageCount) {
      page = pageCount;
    }
    const data = matches.slice(page * 10 - 10, page * 10);

    return await { page: +page, pageCount, data };
  }
}
