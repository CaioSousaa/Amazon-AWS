interface ClientProps {
  name: string;
  email: string;
  createdAt: Date;
}

export class Client {
  private _id: string;
  private props: ClientProps;

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  constructor(props: ClientProps, id?: string) {
    this._id = id ?? crypto.randomUUID();
    this.props = props;
  }
}
