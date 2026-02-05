import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game } from '../schemas/game.schema';
import { CreateGameDto } from '../dto/create-game.dto';

@Injectable()
export class GameService {
  constructor(@InjectModel('Game') private gameModel: Model<Game>) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const newGame = new this.gameModel(createGameDto);
    Logger.log("DTO", createGameDto);
    return await newGame.save();
  }

  async findWinsById(playerId: number): Promise<any> {
    const matches = await this.gameModel.find({ players: playerId });

    const totalGames = matches.length;
    const wins = matches.filter(m => m.winnerPlayerId === playerId).length;
    const losses = totalGames - wins;

    return { totalGames, wins, losses };
  }

  // async getTotalGamesById(playerId: string): Promise<GamesReport> {
  //   const wonGames = await this.matchModel.find({ winnerPlayerId: playerId });
  //   const losedGames = await this.matchModel.find({loserPlayerId: playerId,});

  //   return { wonGames, losedGames };
  // }
}
