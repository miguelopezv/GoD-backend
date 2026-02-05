import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
  @Prop()
  players: [number];

  @Prop()
  winnerPlayerId: number;

  @Prop()
  totalSets: number;

  @Prop({default: Date.now()})
  createdAt: Date;
}

export const GameSchema = SchemaFactory.createForClass(Game);
