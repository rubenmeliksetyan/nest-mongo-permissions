import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  industry?: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
