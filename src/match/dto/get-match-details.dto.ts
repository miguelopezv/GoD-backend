import {
  IsNotEmpty,
  IsString,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class GetMatchDetailsDto {
  @IsNotEmpty()
  @IsString()
  readonly id1: string;

  @IsNotEmpty()
  @IsString()
  readonly id2: string;

  @IsOptional()
  @IsNumberString()
  readonly page: number;
}
