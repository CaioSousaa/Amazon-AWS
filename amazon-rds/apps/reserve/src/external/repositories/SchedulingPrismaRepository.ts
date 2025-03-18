import prisma from 'src/infra/database/Prisma';
import { Scheduling } from 'src/modules/scheduling/domain/entitie/Scheduling';
import { ISchedulingPortRepository } from 'src/modules/scheduling/port/ISchedulingPortRepository';

export class SchedulingPrismaRepository implements ISchedulingPortRepository {
  async create({ appointmentDate_id, customer_id }: Scheduling): Promise<Scheduling> {
    const newScheduling = await prisma.scheduling.create({
      data: { appointmentDate_id, customer_id, createdAt: new Date() },
    });

    return newScheduling;
  }
}
