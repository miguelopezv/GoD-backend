import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../schemas/player.schema';
import { CreatePlayerDto } from '../dto/create-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
  ) {}

  async findOrCreatePlayer(body: CreatePlayerDto): Promise<Player> {
    const { email } = body;

    const player = await this.playerModel.findOne({ email }).lean().exec();

    if (!player) {
      return await this.save(body);
    } else {
      // player.games = await this.matchService.findWinners(player._id);
      return player;
    }
  }

  async save(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const newPlayer = new this.playerModel(createPlayerDto);
    return await newPlayer.save();
  }
}
