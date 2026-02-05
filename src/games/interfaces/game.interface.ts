
export interface Game {
  readonly gameId: number;
  readonly players: [number];
  readonly winnerPlayerId: number;
  readonly totalSets: number
  readonly createdAt: Date;
}
