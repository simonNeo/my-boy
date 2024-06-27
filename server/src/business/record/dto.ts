import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  date: string;
  @IsString()
  time: string;
  @IsNumber()
  type: number;

  @IsNumber()
  feedType: number;

  @IsNumber()
  @IsOptional()
  milkType?: number;

  @IsNumber()
  @IsOptional()
  feedTime?: number;

  @IsNumber()
  @IsOptional()
  feedCapacity?: number;

  @IsBoolean()
  @IsOptional()
  hasPoop?: boolean;

  @IsString()
  memo: string;
}

export class FilterRecordDto {
  @IsString()
  date: string;

  @IsNumber()
  @IsOptional()
  type?: number;
}
