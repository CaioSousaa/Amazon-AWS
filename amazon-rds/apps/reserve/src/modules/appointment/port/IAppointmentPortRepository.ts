import { AppointmentDate } from '../domain/entitie/AppointmentDate';

export interface IAppointmentPortRepository {
  create(appointmentDate: AppointmentDate): Promise<AppointmentDate>;
  findDate(appointmentDate: AppointmentDate): Promise<AppointmentDate>;
}
