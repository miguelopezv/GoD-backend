import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Player } from '../../player/entity/player.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Player, player => player.id)
  winnerPlayer: Player;

  @ManyToOne(type => Player, player => player.id)
  loserPlayer: Player;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
