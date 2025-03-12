import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  project: Types.ObjectId;

  @Prop({ required: true, enum: ['Read', 'Write', 'Delete', 'Admin'] })
  role: 'Read' | 'Write' | 'Delete' | 'Admin';
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
