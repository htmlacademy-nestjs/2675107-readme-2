import { File } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class FileVaultEntity implements File, Entity<string, File> {
  public id?: string;
  public name: string;

  public toPOJO() {
    return {
      id: this.id,
      name: this.name,
    }
  }

  public populate(data: File): FileVaultEntity {
    this.id = data.id ?? undefined;
    this.name = data.name;

    return this;
  }

  static fromObject(data: File): FileVaultEntity {
    return new FileVaultEntity()
      .populate(data);
  }
}
