import { Document } from 'mongoose';
import { Match } from 'src/match/interfaces';

export interface Player extends Document {
  readonly _id: number;
  readonly firstName: string;
  readonly lastName: string;
  games: GameReport;
}

export interface GameReport {
  readonly wonGames: Match[];
  readonly losedGames: Match[];
}
