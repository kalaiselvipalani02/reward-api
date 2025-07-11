import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RedeemDto } from './dto/redeem.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { timestamp } from 'rxjs';

@Injectable()
export class RewardsService {
  constructor(
    @InjectModel('Reward') private readonly rewardModel: Model<any>,
    @InjectModel('Redemption') private readonly redemptionModel: Model<any>,
    @InjectModel('Transaction') private readonly transactionModel: Model<any>,
  ) {}

  async getTotalPoints(userId: string): Promise<number> {
    const reward = await this.rewardModel.findOne({ userId });
    if (!reward) throw new NotFoundException('User not found'); //status 404 not found
    return reward.totalPoints;
  }

  async getUserTransactions(
    userId: string,
    page: number,
    limit: number,
  ): Promise<any> {
    const transactions = await this.transactionModel
      .find({ userId })
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return transactions;
  }

  async redeemPoints(dto: RedeemDto): Promise<string> {
    const reward = await this.rewardModel.findOne({ userId: dto.userId });

    if (!reward) {
      throw new NotFoundException('User not found'); // ✅ Ensure this runs first
    }

    if (reward.totalPoints < dto.pointsToRedeem) {
      throw new BadRequestException('Insufficient points'); //status 400
    }

    reward.totalPoints -= dto.pointsToRedeem;
    await reward.save();

    await this.redemptionModel.create({
      userId: dto.userId,
      pointsRedeemed: dto.pointsToRedeem,
      rewardType: dto.rewardType,
    });

    return 'Redemption successful';
  }

  async getOptions(): Promise<any> {
    const rewardTypes = await this.redemptionModel.distinct('rewardType');
    return rewardTypes;
  }
}
