import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../interfaces';
import { CreatePlayerDto } from '../dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<Player>,
  ) {}

  // TODO: Relations?
  async findPlayer(query: any): Promise<Player> {
    return await this.playerModel
      .findOne({ firstName: query.firstName, lastName: query.lastName })
      .exec();
  }

  async save(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const newPlayer = new this.playerModel(createPlayerDto);
    return await newPlayer.save();
  }
}
