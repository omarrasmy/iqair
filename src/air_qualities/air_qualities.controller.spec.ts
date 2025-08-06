// __tests__/air-qualities.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AirQualitiesController } from './air_qualities.controller';
import { AirQualitiesService } from './air_qualities.service';
import { AirQualitiesQueryParams } from './dto/find-air_quality.dto';

const mockService = {
  getAirQuality: jest.fn(),
  getMostPollutedTime: jest.fn(),
};


describe('AirQualitiesController', () => {
  let controller: AirQualitiesController;

  beforeEach(async () => {
    jest.clearAllMocks(); // Clear previous mock calls
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirQualitiesController],
      providers: [
        {
          provide: AirQualitiesService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AirQualitiesController>(AirQualitiesController);
  });

  it('should return air quality data', async () => {
    const query: AirQualitiesQueryParams = { lat: 48.8566, lon: 2.3522 };
    const mockResponse = { aqius: 80 };
    mockService.getAirQuality.mockResolvedValue(mockResponse);

    const result = await controller.getAirQuality(query);
    expect(result).toEqual(mockResponse);
    expect(mockService.getAirQuality).toHaveBeenCalledWith(query);
  });

  it('should return most polluted time with default standard', async () => {
    const mockResponse = { pollutionLevelUS: 100 };
    mockService.getMostPollutedTime.mockResolvedValue(mockResponse);

    const result = await controller.getMostPolluted(false);
    expect(result).toEqual(mockResponse);
    expect(mockService.getMostPollutedTime).toHaveBeenCalledWith(false);
  });

  it('should return most polluted time with Chinese standard', async () => {
    const mockResponse = { pollutionLevelChina: 150 };
    mockService.getMostPollutedTime.mockResolvedValue(mockResponse);

    const result = await controller.getMostPolluted(true);
    expect(result).toEqual(mockResponse);
    expect(mockService.getMostPollutedTime).toHaveBeenCalledWith(true);
  });
});
