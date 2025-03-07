enum Status {
  pending,
  sent,
  error,
}

interface TaskProps {
  client_id: string;
  status: Status;
  sentAt: Date;
  recipient_email: string;
}

export class Task {
  private _id: string;
  private props: TaskProps;

  get id(): string {
    return this._id;
  }

  get client_id(): string {
    return this.props.client_id;
  }

  get status(): Status {
    return this.props.status;
  }

  get sentAt(): Date {
    return this.props.sentAt;
  }

  get recipient_email(): string {
    return this.props.recipient_email;
  }

  constructor(props: TaskProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}
