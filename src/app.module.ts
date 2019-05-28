import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/game', {
      useNewUrlParser: true,
    }),
    PlayerModule,
    MatchModule,
  ],
})
export class AppModule {}
