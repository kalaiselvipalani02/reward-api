import { Schema } from 'mongoose';

export const TransactionSchema = new Schema({
  userId: String,
  amount: Number,
  category: String,
  pointsEarned: Number,
  timestamp: { type: Date, default: Date.now },
});
