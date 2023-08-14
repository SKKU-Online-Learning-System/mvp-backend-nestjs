import { IsBoolean } from 'class-validator';

export class UpdateOperateDto {
  @IsBoolean()
  operate: boolean;
}
