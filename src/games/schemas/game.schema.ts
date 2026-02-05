import * as mongoose from 'mongoose';

export const GameSchema = new mongoose.Schema({
  players: [Number],
  winnerPlayerId: Number,
  totalSets: Number,
  createdAt: Date,
});
