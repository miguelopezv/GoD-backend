import { MatchService } from './service/match.service';
import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { CreateMatchDto } from './dto/match.dto';
import { Match } from './entity/match.entity';

@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get()
  async findMatches(@Query() query): Promise<object> {
    return this.matchService.getMatches(query.id1, query.id2);
  }

  @Post()
  async saveMatch(@Body() createMatchDto: CreateMatchDto): Promise<Match> {
    return this.matchService.saveMatch(createMatchDto.body);
  }

  @Get('detail')
  async matchesDetail(@Query() query): Promise<object> {
    return this.matchService.getDetailedMatches(query.id1, query.id2, query.page);
  }
}
