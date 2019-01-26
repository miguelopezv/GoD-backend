import { Player } from './entity/player.entity';
import { PlayerService } from './service/player.service';
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dto/player.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async find(@Query() query): Promise<Player[]> {
    return this.playerService.findPlayers(query.id1, query.id2);
  }

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerService.save(createPlayerDto);
  }
}
