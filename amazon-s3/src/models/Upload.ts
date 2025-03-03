import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UploadDocument = HydratedDocument<Upload>;

@Schema()
export class Upload {
  @Prop()
  name: string;

  @Prop()
  size: number;

  @Prop()
  key: string;

  @Prop()
  url: string;

  @Prop()
  createdAt: Date;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
