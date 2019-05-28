import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchReport } from '../interfaces';
import { CreateMatchDto, GetMatchDetailsDto } from '../dto';
import { MatchReportDetails } from '../interfaces';
import { GameReport } from 'src/player/interfaces';

@Injectable()
export class MatchService {
  constructor(
    @InjectModel('Match')
    private readonly matchModel: Model<Match>,
  ) {}

  async getMatches(query: GetMatchDetailsDto): Promise<MatchReport> {
    const { id1, id2 } = query;
    const player1wins = await this.matchModel.countDocuments({
      winnerPlayerId: id1,
      loserPlayerId: id2,
    });

    const player2wins = await this.matchModel.countDocuments({
      winnerPlayerId: id2,
      loserPlayerId: id1,
    });

    return {
      player1: { id: id1, wins: player1wins },
      player2: { id: id2, wins: player2wins },
    };
  }

  async saveMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    const newMatch = new this.matchModel(createMatchDto);
    return await newMatch.save();
  }

  async getDetailedMatches(
    query: GetMatchDetailsDto,
  ): Promise<MatchReportDetails> {
    const { id1, id2 } = query;
    let { page: currentPage = 1 } = query;

    const matches = await this.matchModel
      .find({
        $or: [
          {
            winnerPlayerId: id1,
            loserPlayerId: id2,
          },
          {
            winnerPlayerId: id2,
            loserPlayerId: id1,
          },
        ],
      })
      .lean();

    const pageCount = Math.ceil(matches.length / 10);

    if (+currentPage > pageCount) {
      currentPage = pageCount;
    }

    const data = matches.slice(currentPage * 10 - 10, currentPage * 10);

    return { currentPage, pageCount, data };
  }

  async getGames(playerId: number): Promise<GameReport> {
    const wonGames = await this.matchModel.find({ winnerPlayerId: playerId });
    const losedGames = await this.matchModel.find({
      loserPlayerId: playerId,
    });

    return { wonGames, losedGames };
  }
}
