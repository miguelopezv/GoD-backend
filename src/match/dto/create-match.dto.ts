import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsString()
  readonly winnerPlayerId: string;

  @IsNotEmpty()
  @IsString()
  readonly loserPlayerId: string;
}
