export interface Game {
  readonly players: [number];
  readonly winnerPlayerId: number;
  readonly totalSets: number;
  readonly createdAt: Date;
}
