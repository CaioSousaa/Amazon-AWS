import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomerSchedulingAppointment } from '../scheduling/services/CustomerSchedulingAppointment.service';
import { CustomerPrismaRepository } from '../../external/repositories/CutomerPrismaRepository';
import { AppointmentDatePrismaRepository } from 'src/external/repositories/AppointmentDatePrismaRepository';
import { SchedulingPrismaRepository } from 'src/external/repositories/SchedulingPrismaRepository';
import { ReserveService } from './services/kafka.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ClientsModule.register([
      {
        name: 'RESERVE_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'purchase-service',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'reserve-group',
          },
        },
      },
    ]),
  ],
  providers: [
    CustomerSchedulingAppointment,
    CustomerPrismaRepository,
    AppointmentDatePrismaRepository,
    SchedulingPrismaRepository,
    ReserveService,
  ],
  exports: [EventEmitterModule],
})
export class SchedulingModule {}
