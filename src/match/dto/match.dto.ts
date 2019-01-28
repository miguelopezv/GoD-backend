export class CreateMatchDto {
  body: {
    readonly winnerPlayer: number;
    readonly loserPlayer: number;
  };
}
