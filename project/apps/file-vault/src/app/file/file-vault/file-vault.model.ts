import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { File } from '@project/shared/app/types';

@Schema({
  collection: 'file',
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})
export class FileVaultModel extends Document implements File {
  @Prop({
    required: true
  })
  public name: string;

  public id?: string;
}

export const FileVaultSchema = SchemaFactory.createForClass(FileVaultModel);

FileVaultSchema.virtual('id').get(function() {
  return this._id.toString();
});
