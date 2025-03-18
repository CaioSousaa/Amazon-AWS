import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { CustomerPrismaRepository } from 'src/external/repositories/CutomerPrismaRepository';
import { SchedulingPrismaRepository } from 'src/external/repositories/SchedulingPrismaRepository';
import { ICustomerPortRepository } from 'src/modules/customer/port/ICustomerPortRepository';
import { ISchedulingPortRepository } from '../port/ISchedulingPortRepository';
import { AppointmentDatePrismaRepository } from 'src/external/repositories/AppointmentDatePrismaRepository';
import { IAppointmentPortRepository } from 'src/modules/appointment/port/IAppointmentPortRepository';
import { IProducerData } from '../services/kafka.service';
import { OnEvent } from '@nestjs/event-emitter';
import { Customer } from 'src/modules/customer/domain/entitie/Customer';
import { AppointmentDate } from 'src/modules/appointment/domain/entitie/AppointmentDate';
import { Scheduling } from '../domain/entitie/Scheduling';

@Injectable()
export class CustomerSchedulingAppointment {
  constructor(
    @Inject(CustomerPrismaRepository) private customerRepository: ICustomerPortRepository,
    @Inject(SchedulingPrismaRepository) private schedulingRepository: ISchedulingPortRepository,
    @Inject(AppointmentDatePrismaRepository) private appointmentRepository: IAppointmentPortRepository,
  ) {
    console.log('[CustomerSchedulingAppointment] Serviço iniciado.');
  }

  @OnEvent('purchaseEvent.received', { async: true })
  async handlePurchaseEvent(purchaseData: IProducerData) {
    console.log(`[CustomerSchedulingAppointment] Event received:`, purchaseData);

    const dataCustomer = new Customer({
      id: purchaseData.customer.customer_id,
      cpf: purchaseData.customer.cpf,
      name: purchaseData.customer.name,
    });

    if (!(await this.customerRepository.findByCpf(dataCustomer.cpf))) {
      await this.customerRepository.create(dataCustomer);
    }

    const dataAppointment = new AppointmentDate({
      day: purchaseData.appointmentDate.getUTCDay(),
      month: purchaseData.appointmentDate.getUTCMonth(),
      year: purchaseData.appointmentDate.getUTCFullYear(),
      hours: Number(purchaseData.appointmentDate.getUTCHours().toString().padStart(2, '0')),
      createdAt: new Date(),
    });

    const appointmentExists = await this.appointmentRepository.findDate(dataAppointment);

    if (appointmentExists) {
      throw new NotAcceptableException('time already booked');
    }

    const appointment = await this.appointmentRepository.create(dataAppointment);

    const scheduling = new Scheduling({
      appointmentDate_id: appointment.id!,
      customer_id: dataCustomer.id,
      createdAt: new Date(),
    });

    await this.schedulingRepository.create(scheduling);
    console.log(`[RESERVE] New appointment registered: ${scheduling.id!}`);
  }
}
