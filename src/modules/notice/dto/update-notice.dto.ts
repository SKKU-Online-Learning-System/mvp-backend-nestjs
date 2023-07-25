import { IsString, IsOptional } from 'class-validator';

export class UpdateNoticeDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;
}
