import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { MatchService } from './service';
import { CreateMatchDto, GetMatchDetailsDto } from './dto';
import { Match, MatchReport, MatchReportDetails } from './interfaces';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  async findMatches(@Query() query: GetMatchDetailsDto): Promise<MatchReport> {
    return this.matchService.getMatches(query);
  }

  @Post()
  async saveMatch(@Body() createMatchDto: CreateMatchDto): Promise<Match> {
    return this.matchService.saveMatch(createMatchDto);
  }

  @Get('detail')
  async matchesDetail(
    @Query() query: GetMatchDetailsDto,
  ): Promise<MatchReportDetails> {
    return this.matchService.getDetailedMatches(query);
  }
}
