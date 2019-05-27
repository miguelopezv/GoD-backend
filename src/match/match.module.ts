import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { MatchService } from './service/match.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchSchema } from './schemas/match.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Match', schema: MatchSchema }]),
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
