import { Game } from 'src/games/interfaces';

export interface Player {
  readonly _id: number;
  readonly firstName: string;
  readonly lastName: string;
  games: GameReport;
}

export interface GameReport {
  readonly wonGames: Game[];
  readonly losedGames: Game[];
}
