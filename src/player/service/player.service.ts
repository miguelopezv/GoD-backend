import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../interfaces';
import { CreatePlayerDto } from '../dto';
import { MatchService } from 'src/match/service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
    private matchService: MatchService,
  ) {}

  async findOrCreatePlayer(body: CreatePlayerDto): Promise<Player> {
    const { firstName, lastName } = body;

    const player = await this.playerModel
      .findOne({ firstName, lastName })
      .lean()
      .exec();

    if (!player) {
      return await this.save(body);
    } else {
      player.games = await this.matchService.getGames(player._id);

      return player;
    }
  }

  async save(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const newPlayer = new this.playerModel(createPlayerDto);
    return await newPlayer.save();
  }
}
