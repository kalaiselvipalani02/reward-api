import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchema } from '../rewards/schemas/user.schema';
import { RewardSchema } from '../rewards/schemas/reward.schema';
import { TransactionSchema } from '../rewards/schemas/transaction.schema';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectModel('User') private userModel: Model<any>,
    @InjectModel('Reward') private rewardModel: Model<any>,
    @InjectModel('Transaction') private transactionModel: Model<any>,
  ) {}

  async onApplicationBootstrap() {
    console.log(' Seeding mock data...');

    await this.userModel.deleteMany({});
    await this.rewardModel.deleteMany({});
    await this.transactionModel.deleteMany({});

    const users = [
      { _id: 'u1', name: 'Alice', email: 'alice@example.com' },
      { _id: 'u2', name: 'Bob', email: 'bob@example.com' },
    ];

    const rewards = [
      { userId: 'u1', totalPoints: 120 },
      { userId: 'u2', totalPoints: 60 },
    ];

    const transactions = [
      { userId: 'u1', amount: 200, category: 'shopping', pointsEarned: 20 },
      { userId: 'u1', amount: 300, category: 'travel', pointsEarned: 30 },
      { userId: 'u1', amount: 100, category: 'food', pointsEarned: 10 },
      { userId: 'u2', amount: 150, category: 'shopping', pointsEarned: 15 },
      { userId: 'u2', amount: 100, category: 'food', pointsEarned: 5 },
    ];

    await this.userModel.insertMany(users);
    await this.rewardModel.insertMany(rewards);
    await this.transactionModel.insertMany(transactions);

    console.log('✅ Mock data seeded');
  }
}
