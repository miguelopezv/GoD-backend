import * as mongoose from 'mongoose';

export const MatchSchema = new mongoose.Schema({
  winnerPlayerId: mongoose.Schema.Types.ObjectId,
  loserPlayerId: mongoose.Schema.Types.ObjectId,
});
