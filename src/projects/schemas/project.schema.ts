import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  status: 'Active' | 'Archived';

  @Prop({ type: Number, enum: [1, 2, 3], default: 2 })
  priority?: number;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  company: Types.ObjectId;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
