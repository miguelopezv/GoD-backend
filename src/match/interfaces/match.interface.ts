import { Document } from 'mongoose';

export interface Match extends Document {
  readonly winnerPlayerId: number;
  readonly loserPlayerId: number;
}
