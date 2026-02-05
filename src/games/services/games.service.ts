import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GamesReport } from '../interfaces';
import { GameSchema } from '../schemas/game.schema';
import { CreateGameDto, GetMatchDetailsDto } from '../dto';

@Injectable()
export class GameService {
  constructor(@InjectModel('Game') private matchModel: Model<Game>) {}

  async saveGame(createGameDto: CreateGameDto): Promise<Game> {
    const newMatch = new this.matchModel(createGameDto);
    return await newMatch.save();
  }

  async findWinners(): Promise<Game[]> {
    const result = await this.matchModel.aggregate([
    {
      $group: {
        _id: "$winner",
        wins: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        wins: 1
      }
    }
  ]);
  return result;
  }

  // async getTotalGamesById(playerId: string): Promise<GamesReport> {
  //   const wonGames = await this.matchModel.find({ winnerPlayerId: playerId });
  //   const losedGames = await this.matchModel.find({loserPlayerId: playerId,});

  //   return { wonGames, losedGames };
  // }
}
