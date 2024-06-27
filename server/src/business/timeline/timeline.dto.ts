import { IsNumber, IsOptional, IsString } from 'class-validator';

export class TimelineAttachmentDto {
  @IsString()
  name: string;
  @IsString()
  url: string;
  @IsNumber()
  @IsOptional()
  type: number;
}

export class CreateTimelineDto {
  @IsString()
  content: string;

  @IsOptional()
  attachments: TimelineAttachmentDto[];
}
