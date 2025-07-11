import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardsModule } from './rewards/rewards.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ??
        (() => {
          throw new Error('MONGODB_URI is not set');
        })(),
    ),
    RewardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
