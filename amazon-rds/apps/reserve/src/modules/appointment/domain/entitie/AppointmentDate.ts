export class AppointmentDate {
  id?: string;
  day: number;
  month: number;
  year: number;
  hours: number;
  createdAt: Date;

  constructor({ day, month, year, createdAt, hours }: AppointmentDate) {
    Object.assign(this, { day, month, year, createdAt, hours });
  }

  static create({ day, month, year, hours }: AppointmentDate) {
    const appointmentDate = new AppointmentDate({
      day,
      month,
      year,
      hours,
      createdAt: new Date(),
    });

    return appointmentDate;
  }
}
