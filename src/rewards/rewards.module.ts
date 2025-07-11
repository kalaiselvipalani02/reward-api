import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RewardsController } from './rewards.controller';
import { SeederService } from '../seeder/seeder.service';

import { UserSchema } from './schemas/user.schema';
import { RewardSchema } from './schemas/reward.schema';
import { TransactionSchema } from './schemas/transaction.schema';
import { RewardsService } from './rewards.service';
import { RedemptionSchema } from './schemas/redemption.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Reward', schema: RewardSchema },
      { name: 'Transaction', schema: TransactionSchema },
      { name: 'Redemption', schema: RedemptionSchema },
    ]),
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
  exports: [RewardsService],
})
export class RewardsModule {}
