import { Game } from './game.interface';

export interface GamesReport {
  currentPage: number;
  pageCount: number;
  data: Game[];
}
