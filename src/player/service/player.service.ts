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

  async findOrCreatePlayer(body: CreatePlayerDto): Promise<Player> {
    const { firstName, lastName } = body;
    const player = await this.playerModel
      .findOne({ firstName, lastName })
      .exec();

    if (!player) {
      return await this.save(body);
    } else {
      const usuario = player;
      usuario.games = await this._getGames(player);
      // TODO: Games missing
      return usuario;
    }
  }

  async save(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const newPlayer = new this.playerModel(createPlayerDto);
    return await newPlayer.save();
  }

  private async _getGames(player: Player): Promise<GameReport> {
    const wonGames = await this.matchModel
      .find({ winnerPlayerId: player._id })
      .exec();
    const losedGames = await this.matchModel
      .find({ loserPlayerId: player._id })
      .exec();

    return { wonGames, losedGames };
  }
}
