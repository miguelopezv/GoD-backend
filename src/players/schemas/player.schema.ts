import * as mongoose from 'mongoose';

export const PlayerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});
