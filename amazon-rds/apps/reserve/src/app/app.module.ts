import { Module } from '@nestjs/common';
import { SchedulingModule } from 'src/modules/scheduling/scheduling.module';

@Module({
  imports: [SchedulingModule],
})
export class AppModule {}
