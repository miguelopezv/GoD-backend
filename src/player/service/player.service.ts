import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, GameReport } from '../interfaces';
import { CreatePlayerDto } from '../dto';
import { Match } from 'src/match/interfaces';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
    @InjectModel('Match')
    private readonly matchModel: Model<Match>,
  ) {}

  async findOrCreatePlayer(body: CreatePlayerDto): Promise<any> {
    const { firstName, lastName } = body;

    const player = await this.playerModel
      .findOne({ firstName, lastName })
      .lean()
      .exec();

    if (!player) {
      return await this.save(body);
    } else {
      player.games = await this._getGames(player);

      return player;
    }
  }

  async save(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const newPlayer = new this.playerModel(createPlayerDto);
    return await newPlayer.save();
  }

  private async _getGames(player: Player): Promise<GameReport> {
    const wonGames = await this.matchModel.find({ winnerPlayerId: player._id });
    const losedGames = await this.matchModel.find({
      loserPlayerId: player._id,
    });

    return { wonGames, losedGames };
  }
}
