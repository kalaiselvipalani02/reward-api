import { Module } from '@nestjs/common';
import { UserSchema } from "src/rewards/schemas/user.schema";
import { SeederService } from "./seeder.service";
import { MongooseModule } from "@nestjs/mongoose";
import { RewardSchema } from "src/rewards/schemas/reward.schema";
import { TransactionSchema } from "src/rewards/schemas/transaction.schema";

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
        { name: 'Reward', schema: RewardSchema },
        { name: 'Transaction', schema: TransactionSchema },
      ]),
    ],
    providers: [SeederService],
    exports: [SeederService],
  })
  export class SeederModule {}