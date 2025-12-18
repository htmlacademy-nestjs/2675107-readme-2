import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { ConfigUsersModule } from "@project/shared/config/users"

@Module({
  imports: [AuthenticationModule, UserModule, ConfigUsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
