import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from '../entity/player.entity';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async findPlayer(query: any): Promise<Player> {
    return await this.playerRepository.findOne({where: {firstName: query.firstName, lastName: query.lastName},
      relations: ['wonMatches', 'losedMatches'],
    });
  }

  async save(data: any): Promise<Player> {
    return await this.playerRepository.save(data);
  }
}
