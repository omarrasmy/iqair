import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import { CityResponseDto } from './dto/find-city.dto';
import { CITY_INTERFACE_REPOSITORY } from './interface/city.tokens';

describe('CitiesService', () => {
  let service: CitiesService;
  const mockCityRepo = { findOneBylongAndLat: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks(); // Clear previous mock calls
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: CITY_INTERFACE_REPOSITORY,
          useValue: mockCityRepo,
        },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneBylongAndLat', () => {
    const coords = { long: 31.2357, lat: 30.0444 };

    it('should return city data when repository resolves successfully', async () => {
      const mockCity: CityResponseDto = {
        id: 1,
        name: 'Cairo',
      };

      mockCityRepo.findOneBylongAndLat.mockResolvedValue(mockCity);

      const result = await service.findOneBylongAndLat(coords);
      expect(mockCityRepo.findOneBylongAndLat).toHaveBeenCalledWith(coords);
      expect(result).toEqual(mockCity);
    });

    it('should return null if city is not found (and repository returns null)', async () => {
      mockCityRepo.findOneBylongAndLat.mockResolvedValue(null);

      const result = await service.findOneBylongAndLat(coords);
      expect(result).toBeNull();
    });

    it('should throw an error if repository throws an exception', async () => {
      mockCityRepo.findOneBylongAndLat.mockRejectedValue(new Error('DB Error'));

      await expect(service.findOneBylongAndLat(coords)).rejects.toThrow('DB Error');
    });
  });
});
