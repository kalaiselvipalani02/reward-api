import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RedeemDto } from './dto/redeem.dto';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get('/points')
  getPoints(@Query('userId') userId: string) {
    return this.rewardsService.getTotalPoints(userId);
  }

  @Get('/transactions')
  getTransactions(
    @Query('userId') userId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ) {
    return this.rewardsService.getUserTransactions(userId, page, limit);
  }

  @Post('/redeem')
  redeem(@Body() dto: RedeemDto) {
    return this.rewardsService.redeemPoints(dto);
  }

  @Get('/options')
  getOptions() {
    return this.rewardsService.getOptions();
  }
}
