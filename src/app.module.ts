import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './players/players.module';
import { MatchModule } from './games/game.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/game'),
    PlayerModule,
    MatchModule,
  ],
})
export class AppModule {}
