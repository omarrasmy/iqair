import { Test, TestingModule } from '@nestjs/testing';
import { CornService } from './corn.service';
import { AirQualitiesService } from 'src/air_qualities/air_qualities.service';

describe('CornService', () => {
  let service: CornService;
  let mockAirQualitiesService = { saveParisAirQuality: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks(); // Clear previous mock calls

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CornService,
        {
          provide: AirQualitiesService,
          useValue: mockAirQualitiesService,
        },
      ],
    }).compile();

    service = module.get<CornService>(CornService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('handleCron', () => {
    it('should call AirQualitiesService.saveParisAirQuality()', async () => {
      await service.handleCron();

      expect(mockAirQualitiesService.saveParisAirQuality).toHaveBeenCalled();
    });

    it('should log when handleCron is called', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      await service.handleCron();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Running cron job to save Paris air quality data every minute'
      );

      consoleSpy.mockRestore();
    });

    it('should propagate errors from saveParisAirQuality', async () => {
      mockAirQualitiesService.saveParisAirQuality.mockRejectedValue(new Error('API Error'));

      await expect(service.handleCron()).rejects.toThrow('API Error');
    });
  });
});
