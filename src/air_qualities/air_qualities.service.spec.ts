// __tests__/air-qualities.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from 'src/common/redis/redis.service';
import { CitiesService } from 'src/cities/cities.service';
import { AirQualitiesService } from './air_qualities.service';
import { AIRQUALITY_INTERFACE_REPOSITORY, AIRQUALITY_INTERFACE_SCHEMA_FACTORY } from './interface/air_quality.tokens';
import { AirQualitiesQueryParams } from './dto/find-air_quality.dto';
import { BadRequestException } from '@nestjs/common';
import * as requestUtil from 'src/helper/utilities/requests'; // Adjust path

const mockCitiesService = {
  findOneBylongAndLat: jest.fn(),
};
jest.mock('axios'); // Mock the entire axios module

//env variables for testing
beforeAll(() => {
  process.env.IQAIR_API_URL = 'https://api.example.com/air-quality?lat={lat}&long={long}&key={key}';
  process.env.IRQIR_API_KEY = 'test-api-key';

});
const mockRedisService = {};

const mockAirQualityRepo = {
  create: jest.fn(),
  findOne: jest.fn(),
};

const mockSchemaFactory = {
  createFromIqApiNearestToIqAirResponseDto: jest.fn(),
  createFromIqAirResponseToCreateAirQualityDto: jest.fn(),
};

describe('AirQualitiesService', () => {
  let service: AirQualitiesService;
  beforeEach(async () => {
    jest.clearAllMocks(); // Clear previous mock calls
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirQualitiesService,
        { provide: AIRQUALITY_INTERFACE_REPOSITORY, useValue: mockAirQualityRepo },
        { provide: AIRQUALITY_INTERFACE_SCHEMA_FACTORY, useValue: mockSchemaFactory },
        { provide: RedisService, useValue: mockRedisService },
        { provide: CitiesService, useValue: mockCitiesService },
      ],
    }).compile();

    service = module.get<AirQualitiesService>(AirQualitiesService);
  });

  describe('getAirQuality', () => {
    it('should return transformed air quality data', async () => {
      const mockQuery: AirQualitiesQueryParams = { lat: 48.8566, lon: 2.3522 };
      const mockApiResponse = {
        data: {
          current: { pollution: { aqius: 80 } },
        },
      };

      jest.spyOn(requestUtil, 'requests').mockResolvedValue(mockApiResponse);

      mockSchemaFactory.createFromIqApiNearestToIqAirResponseDto.mockReturnValue({ aqius: 80 });
      const result = await service.getAirQuality(mockQuery);
      // (requests as jest.Mock).mockResolvedValue(mockApiResponse);
      expect(result).toEqual({ aqius: 80 });
      expect(requestUtil.requests).toHaveBeenCalledWith(
        process.env.IQAIR_API_URL.replace('{lat}', mockQuery.lat.toString())
          .replace('{long}', mockQuery.lon.toString())
          .replace('{key}', process.env.IRQIR_API_KEY),
        undefined,
        {
          headers: { 'Content-Type': 'application/json' },
        },
        "get",
        200,
        "Air Quality API Response Validation Failed (Invalid Response)"
      );

    });

    it('should throw if API response is invalid', async () => {
      const mockQuery: AirQualitiesQueryParams = { lat: 0, lon: 0 };
      const mockApiResponse = { data: {} };
      jest.spyOn(requestUtil, 'requests').mockResolvedValue(mockApiResponse);

      await expect(service.getAirQuality(mockQuery)).rejects.toThrow(BadRequestException);
      expect(requestUtil.requests).toHaveBeenCalledWith(
        process.env.IQAIR_API_URL.replace('{lat}', mockQuery.lat.toString())
          .replace('{long}', mockQuery.lon.toString())
          .replace('{key}', process.env.IRQIR_API_KEY),
        undefined,
        {
          headers: { 'Content-Type': 'application/json' },
        },
        "get",
        200,
        "Air Quality API Response Validation Failed (Invalid Response)"
      );
    });
  });

  describe('saveParisAirQuality', () => {
    it('should save air quality data for Paris', async () => {
      const city = { id: 1 };
      const airData = { aqius: 75 };
      const dto = { cityId: 1, pollutionLevelUS: 75 };

      mockCitiesService.findOneBylongAndLat.mockResolvedValue(city);
      jest.spyOn(service, 'getAirQuality').mockResolvedValue(airData as any);
      mockSchemaFactory.createFromIqAirResponseToCreateAirQualityDto.mockReturnValue(dto);

      await service.saveParisAirQuality();

      expect(mockAirQualityRepo.create).toHaveBeenCalledWith(dto);
    });

    it('should do nothing if city is not found', async () => {
      mockCitiesService.findOneBylongAndLat.mockResolvedValue(null);
      const spy = jest.spyOn(service, 'getAirQuality');

      await service.saveParisAirQuality();
      expect(spy).not.toHaveBeenCalled();
      expect(mockAirQualityRepo.create).not.toHaveBeenCalled();
    });

    it('should do nothing if air data is null', async () => {
      mockCitiesService.findOneBylongAndLat.mockResolvedValue({ id: 1 });
      jest.spyOn(service, 'getAirQuality').mockResolvedValue(null);

      await service.saveParisAirQuality();
      expect(mockAirQualityRepo.create).not.toHaveBeenCalled();
    });
  });

  describe('getMostPollutedTime', () => {
    it('should call repo with US sort key if Chinese is false', async () => {
      const city = { id: 5 };
      mockCitiesService.findOneBylongAndLat.mockResolvedValue(city);

      await service.getMostPollutedTime(false);

      expect(mockAirQualityRepo.findOne).toHaveBeenCalledWith({
        order: { pollutionLevelUS: 'DESC', recordedAt: 'DESC', createdAt: 'DESC' },
        where: { cityId: city.id },
        relations: ['city'],
      });
    });

    it('should call repo with China sort key if Chinese is true', async () => {
      const city = { id: 5 };
      mockCitiesService.findOneBylongAndLat.mockResolvedValue(city);

      await service.getMostPollutedTime(true);

      expect(mockAirQualityRepo.findOne).toHaveBeenCalledWith({
        order: { pollutionLevelChina: 'DESC', recordedAt: 'DESC', createdAt: 'DESC' },
        where: { cityId: city.id },
        relations: ['city'],
      });
    });
  });
});
