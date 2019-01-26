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

  async findPlayers(id1: number, id2: number): Promise<Player[]> {
    return await this.playerRepository.findByIds([id1, id2], {
      relations: ['winMatchs', 'loseMatchs'],
    });
  }

  async save(data: any): Promise<Player> {
    return await this.playerRepository.save(data);
  }
}
