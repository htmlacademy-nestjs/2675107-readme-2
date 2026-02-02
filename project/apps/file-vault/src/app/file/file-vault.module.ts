import { Module } from '@nestjs/common';

import { FileVaultService } from './file-vault.service';
import { FileVaultController } from './file-vault.controller';

@Module({
  imports: [],
  providers: [FileVaultService],
  controllers: [FileVaultController],
})
export class FileVaultModule {}
