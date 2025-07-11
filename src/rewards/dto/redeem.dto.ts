import { IsString, IsNumber, Min } from 'class-validator';

export class RedeemDto {
  @IsString()
  userId: string;

  @IsNumber()
  @Min(1, { message: 'pointsRedeemed must be at least 1' })
  pointsToRedeem: number;

  @IsString()
  rewardType: string;
}
