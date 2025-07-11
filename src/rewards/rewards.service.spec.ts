import { Test, TestingModule } from '@nestjs/testing';
import { RewardsService } from './rewards.service';
import { getModelToken } from '@nestjs/mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('RewardsService', () => {
  let service: RewardsService;

  const mockRewardModel = {
    findOne: jest.fn(),
  };

  const mockRedemptionModel = {
    create: jest.fn(),
  };
  const mockTransactionModel = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RewardsService,
        {
          provide: getModelToken('Reward'),
          useValue: mockRewardModel,
        },
        {
          provide: getModelToken('Redemption'),
          useValue: mockRedemptionModel,
        },
        {
          provide: getModelToken('Transaction'),
          useValue: mockTransactionModel,
        },
      ],
    }).compile();

    service = module.get<RewardsService>(RewardsService);
  });

  it('should redeem points if user has enough points', async () => {
    mockRewardModel.findOne.mockResolvedValue({
      userId: 'u1',
      totalPoints: 100,
      save: jest.fn().mockResolvedValue(true),
    });

    mockRedemptionModel.create.mockResolvedValue(true);

    const dto = { userId: 'u1', pointsToRedeem: 50, rewardType: 'voucher' };

    const result = await service.redeemPoints(dto);

    expect(result).toEqual('Redemption successful');
  });

  it('should throw if user has insufficient points', async () => {
    mockRewardModel.findOne.mockResolvedValue({
      userId: 'u1',
      totalPoints: 50,
    });

    await expect(
      service.redeemPoints({
        userId: 'u1',
        pointsToRedeem: 100,
        rewardType: 'voucher',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw if user not found', async () => {
    mockRewardModel.findOne.mockResolvedValue(null);

    await expect(
      service.redeemPoints({
        userId: 'fake',
        pointsToRedeem: 100,
        rewardType: 'voucher',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
