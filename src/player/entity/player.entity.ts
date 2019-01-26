import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Match } from '../../match/entity/match.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  firstName: string;

  @Column({ length: 30 })
  lastName: string;

  @OneToMany(type => Match, match => match.winnerPlayer)
  winMatchs: Match[];

  @OneToMany(type => Match, match => match.loserPlayer)
  loseMatchs: Match[];
}
