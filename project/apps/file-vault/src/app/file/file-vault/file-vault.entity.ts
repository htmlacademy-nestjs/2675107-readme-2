export interface FileVault {
  id?: string;
  originalName: string;
  filename: string;
  path: string;
  mimetype: string;
  size: number;
  uploadedBy?: string;
}

export class FileVaultEntity {
  public id?: string;
  public originalName: string;
  public filename: string;
  public path: string;
  public mimetype: string;
  public size: number;
  public uploadedBy?: string;

  public toPOJO() {
    return {
      id: this.id,
      originalName: this.originalName,
      filename: this.filename,
      path: this.path,
      mimetype: this.mimetype,
      size: this.size,
      uploadedBy: this.uploadedBy,
    };
  }

  public populate(data: FileVault): FileVaultEntity {
    Object.assign(this, data);
    return this;
  }

  static fromObject(data: FileVault): FileVaultEntity {
    return new FileVaultEntity().populate(data);
  }
}
