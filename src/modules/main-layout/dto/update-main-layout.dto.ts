import { PartialType } from '@nestjs/swagger';
import { CreateMainLayoutDto } from './create-main-layout.dto';

export class UpdateMainLayoutDto extends PartialType(CreateMainLayoutDto) {}
