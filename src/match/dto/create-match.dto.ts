import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsNumber()
  readonly winnerPlayerId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly loserPlayerId: number;
}
