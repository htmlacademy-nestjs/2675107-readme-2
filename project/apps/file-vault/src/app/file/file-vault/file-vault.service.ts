import 'multer';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { extension } from 'mime-types';

import { FileVaultConfig } from '@project/shared/config/file-vault';
import { InjectModel } from '@nestjs/mongoose';
import { FileVaultModel } from './file-vault.model';
import { Model } from 'mongoose';

@Injectable()
export class FileVaultService {
  private readonly logger = new Logger(FileVaultService.name);

  constructor(
    @Inject(FileVaultConfig.KEY)
    private readonly config: ConfigType<typeof FileVaultConfig>,
    @InjectModel(FileVaultModel.name)
    private readonly fileVaultModel: Model<FileVaultModel>
  ) {}

  private getUploadDirectoryPath(): string {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    return join(this.config.uploadDirectory, year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename);
  }

  public async saveFile(
    file: Express.Multer.File,
    userId?: string
  ): Promise<FileVaultModel> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();

      const fileName = randomUUID();
      const fileExtension = extension(file.mimetype);

      const finalFileName = `${fileName}.${fileExtension}`;
      const destinationFile = this.getDestinationFilePath(finalFileName);

      await ensureDir(uploadDirectoryPath);
      await writeFile(destinationFile, new Uint8Array(file.buffer));

      const createdFile = await this.fileVaultModel.create({
        originalName: file.originalname,
        filename: finalFileName,
        path: destinationFile,
        mimetype: file.mimetype,
        size: file.size,
        uploadedBy: userId
      });

      return createdFile;
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }
}
