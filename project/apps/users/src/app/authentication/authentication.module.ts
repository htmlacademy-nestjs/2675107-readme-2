import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/shared/config/users';
import { JwtAccessStrategy } from './strategies/jwt-access-strategy';

@Module({
  imports: [UserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,
    })
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtAccessStrategy]
})
export class AuthenticationModule {}
