import { Document } from 'mongoose';

// TODO: Update with relations?
export interface Player extends Document {
  readonly firstName: string;
  readonly lastName: string;
}
