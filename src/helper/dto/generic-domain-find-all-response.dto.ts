import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class GenericFindAllDomainResponse<TEntity> {
  @AutoMap()
  @ApiProperty({
    description: 'Array of entities',
  })
  data: TEntity[];
  @AutoMap()
  @ApiProperty({
    description: 'Current page number',
    example: 1
  })
  currentPage: number;
  @AutoMap()
  @ApiProperty({
    description: 'Next page number',
    example: 2
  })
  nextPage: number;
  @AutoMap()
  @ApiProperty({
    description: 'Total number of entities',
    example: 100
  })
  totalCount: number;
  @AutoMap()
  @ApiProperty({
    description: 'Count of entities in the current page',
    example: 10
  })
  count: number;

  constructor(entity?: TEntity[], currentPage?, nextPage?, totalCount?, count?) {
    this.data = entity;
    this.currentPage = currentPage;
    this.nextPage = nextPage;
    this.totalCount = totalCount;
    this.count = count;
  }
}
