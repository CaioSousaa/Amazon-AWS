import prisma from 'src/infra/database/Prisma';
import { AppointmentDate } from 'src/modules/appointment/domain/entitie/AppointmentDate';
import { IAppointmentPortRepository } from 'src/modules/appointment/port/IAppointmentPortRepository';

export class AppointmentDatePrismaRepository implements IAppointmentPortRepository {
  async create({ day, hours, month, year }: AppointmentDate): Promise<AppointmentDate> {
    const newAppointmentDate = await prisma.appointmentDate.create({
      data: {
        day,
        hours,
        month,
        year,
        createdAt: new Date(),
      },
    });

    return newAppointmentDate;
  }

  async findDate({ day, month, year, hours }: AppointmentDate): Promise<AppointmentDate> {
    const findDate = await prisma.appointmentDate.findFirst({
      where: {
        day,
        month,
        year,
        hours,
      },
    });

    return findDate!;
  }
}
