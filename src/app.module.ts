import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from './player/player.module';
import { MatchModule } from './match/match.module';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), PlayerModule, MatchModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
