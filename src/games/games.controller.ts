import { Controller, Get, Post, Query, Body, Logger } from '@nestjs/common';
import { Game, GamesReport } from './interfaces';
import { GameService } from './services/games.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  async getGamesById(@Query() query): Promise<GamesReport> {
    return this.gameService.findWinsById(+query.id);
  }
  
  @Post()
  async saveMatch(@Body() createGameDto: CreateGameDto): Promise<Game> {
    return this.gameService.create(createGameDto);
  }
  
  // @Get('detail')
  // async matchesDetail(
  //   @Query() query: GetMatchDetailsDto,
  // ): Promise<MatchReportDetails> {
  //   return this.matchService.getDetailedMatches(query);
  // }

}
