import { Controller, Post, Body } from '@nestjs/common';
import { Player } from './interfaces';
import { PlayerService } from './service/player.service';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  async findOrCreate(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    return this.playerService.findOrCreatePlayer(createPlayerDto);
  }
}
