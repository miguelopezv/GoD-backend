import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameController } from './games.controller';
import { GameService } from './services/games.service';
import { GameSchema } from './schemas/game.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }])],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
