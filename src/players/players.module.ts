import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerController } from './players.controller';
import { PlayerService } from './services/players.service';
import { PlayerSchema } from './schemas/player.schema';
import { MatchModule } from 'src/games/game.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
    MatchModule,
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
