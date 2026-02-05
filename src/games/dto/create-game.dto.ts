import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  readonly winnerPlayerId: Number;

  @IsNotEmpty()
  readonly players: [Number];

  readonly totalSets: Number;

  readonly createdAt: Date;
}