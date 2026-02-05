import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { CreateGameDto, GetMatchDetailsDto } from './dto';
import { Game, GamesReport } from './interfaces';
import { GameService } from './services/games.service';

@Controller('game')
export class GameController {
  constructor(private readonly matchService: GameService) {}

  @Get()
  async findMatches(@Query() query: GetMatchDetailsDto): Promise<any> {
    return this.matchService.findWinners();
  }

  // @Get('detail')
  // async matchesDetail(
  //   @Query() query: GetMatchDetailsDto,
  // ): Promise<MatchReportDetails> {
  //   return this.matchService.getDetailedMatches(query);
  // }

  @Post()
  async saveMatch(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.matchService.saveGame(createGameDto);
  }
}
