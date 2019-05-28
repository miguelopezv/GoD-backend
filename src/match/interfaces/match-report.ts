export interface MatchReport {
  player1: VsMatches;
  player2: VsMatches;
}

export interface VsMatches {
  id: string;
  wins: number;
}
