import { Module } from '@nestjs/common';
import { CompleteService } from './complete.service';
import { CompleteController } from './complete.controller';

@Module({
	providers: [CompleteService],
	controllers: [CompleteController],
	exports: [CompleteService],
})
export class CompleteModule {}
