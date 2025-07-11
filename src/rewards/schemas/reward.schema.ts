import { Schema } from 'mongoose';

export const RewardSchema = new Schema({
  userId: String,
  totalPoints: Number,
  updatedAt: { type: Date, default: Date.now },
});
