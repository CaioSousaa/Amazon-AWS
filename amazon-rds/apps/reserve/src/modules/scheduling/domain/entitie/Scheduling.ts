export class Scheduling {
  id?: string;
  customer_id: string;
  appointmentDate_id: string;
  createdAt: Date;

  constructor({ customer_id, appointmentDate_id, createdAt }: Scheduling) {
    Object.assign(this, { customer_id, appointmentDate_id, createdAt });
  }

  static create({ customer_id, appointmentDate_id }: Scheduling) {
    const scheduling = new Scheduling({
      customer_id,
      appointmentDate_id,
      createdAt: new Date(),
    });

    return scheduling;
  }
}
