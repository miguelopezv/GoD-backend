import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { Player } from './interfaces';
import { PlayerService } from './service/player.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get()
  async find(@Query() query): Promise<Player> {
    return this.playerService.findPlayer(query);
  }

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerService.save(createPlayerDto);
  }
}
