import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static'

import { FileVaultService } from './file-vault.service';
import { FileVaultController } from './file-vault.controller';
import { ConfigService } from '@nestjs/config';

const SERVE_ROOT = '/static';

@Module({
  imports: [
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => {
        const rootPath = ConfigService.get<string>('application.uploadDirectory');
        return [{
          rootPath,
          serveRoot: SERVE_ROOT,
          serveStaticOptions: {
            fallthrough: true,
            etag: true,
          }
        }]
      }
    })
  ],
  providers: [FileVaultService],
  controllers: [FileVaultController],
})
export class FileVaultModule {}
