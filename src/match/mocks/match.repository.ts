import { EntityRepository, Repository } from 'typeorm';
import { Match } from '../entity/match.entity';

@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {}
