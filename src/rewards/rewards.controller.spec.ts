import { Test, TestingModule } from '@nestjs/testing';
import { RewardsController } from './rewards.controller';
import { RewardsService } from './rewards.service';
import { RedeemDto } from './dto/redeem.dto';

describe('RewardsController', () => {
  let controller: RewardsController;
  let service: RewardsService;

  const mockRewardsService = {
    redeemPoints: jest.fn(),
    getTotalPoints: jest.fn(),
    getUserTransactions: jest.fn(),
    getOptions: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardsController],
      providers: [{ provide: RewardsService, useValue: mockRewardsService }],
    }).compile();

    controller = module.get<RewardsController>(RewardsController);
    service = module.get<RewardsService>(RewardsService);
  });

  it('should redeem points', async () => {
    const dto = { userId: 'u1', pointsToRedeem: 50, rewardType: 'voucher' };
    mockRewardsService.redeemPoints.mockResolvedValue('Redemption successful');
    const result = await controller.redeem(dto);
    expect(result).toEqual('Redemption successful');
    expect(mockRewardsService.redeemPoints).toHaveBeenCalledWith(dto);
  });

  it('should get total points', async () => {
    mockRewardsService.getTotalPoints.mockResolvedValue(100);
    const result = await controller.getPoints('u1');
    expect(result).toEqual(100);
    expect(mockRewardsService.getTotalPoints).toHaveBeenCalledWith('u1');
  });

  it('should get user transactions', async () => {
    mockRewardsService.getUserTransactions.mockResolvedValue([
      { id: 't1', userId: 'u1', pointsToRedeem: 50, rewardType: 'voucher' },
    ]);
    const result = await controller.getTransactions('u1', 1, 5);
    expect(result).toEqual([
      { id: 't1', userId: 'u1', pointsToRedeem: 50, rewardType: 'voucher' },
    ]);
  });
});
