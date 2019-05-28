import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerController } from './player.controller';
import { PlayerService } from './service/player.service';
import { PlayerSchema } from './schemas/';
import { MatchModule } from 'src/match/match.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
    MatchModule,
  ],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
