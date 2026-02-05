import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../interfaces/player.interface';
import { CreatePlayerDto } from '../dto/create-player.dto';
import { GameService } from 'src/games/services/games.service';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
    private gameService: GameService,
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
      // player.games = await this.matchService.findWinners(player._id);

      return player;
    }
  }

  async save(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const newPlayer = new this.playerModel(createPlayerDto);
    return await newPlayer.save();
  }
}
