import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchReport } from '../interfaces';
import { CreateMatchDto, GetMatchDetailsDto } from '../dto';
import { MatchReportDetails } from '../interfaces/match-report-detail';

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
    const { id1, id2, page } = query;
    let currentPage: number;

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

    if (!page) {
      currentPage = 1;
    }
    if (+page > pageCount) {
      currentPage = pageCount;
    }

    const data = matches.slice(currentPage * 10 - 10, currentPage * 10);

    return { currentPage, pageCount, data };
  }
}
