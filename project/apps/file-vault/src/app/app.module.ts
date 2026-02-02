import { Module } from '@nestjs/common';
import { FileVaultConfigModule } from '@project/shared/config/file-vault';
import { FileVaultModule } from './file/file-vault.module';


@Module({
  imports: [
    FileVaultConfigModule,
    FileVaultModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
