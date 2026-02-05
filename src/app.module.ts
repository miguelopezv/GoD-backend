import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './players/players.module';
import { GameModule } from './games/games.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/game'),
    PlayerModule,
    GameModule,
  ],
})
export class AppModule {}
