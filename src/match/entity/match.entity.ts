import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { Player } from '../../player/entity/player.entity';

@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Player, player => player.id)
  winnerPlayer: number;

  @ManyToOne(type => Player, player => player.id)
  loserPlayer: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
