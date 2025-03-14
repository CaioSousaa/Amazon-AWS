export class AppointmentDate {
  id?: string;
  day: string;
  month: string;
  year: string;
  createdAt: Date;

  constructor({ day, month, year, createdAt }: AppointmentDate) {
    Object.assign(this, { day, month, year, createdAt });
  }

  static create({ day, month, year }: AppointmentDate) {
    const appointmentDate = new AppointmentDate({
      day,
      month,
      year,
      createdAt: new Date(),
    });

    return appointmentDate;
  }
}
