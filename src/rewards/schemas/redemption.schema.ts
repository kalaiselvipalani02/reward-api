import { Schema } from 'mongoose';

export const RedemptionSchema = new Schema({
  userId: String,
  pointsRedeemed: Number,
  rewardType: String,
  timestamp: { type: Date, default: Date.now },
});
