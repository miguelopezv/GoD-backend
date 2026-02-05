import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  readonly players: [number];

  @IsNotEmpty()
  readonly winnerPlayerId: number;

  @IsNotEmpty()
  readonly totalSets: number;
}
