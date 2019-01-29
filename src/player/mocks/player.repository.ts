import { EntityRepository, Repository } from 'typeorm';
import { Player } from '../entity/player.entity';

@EntityRepository(Player)
export class PlayerRepository extends Repository<Player> { }
