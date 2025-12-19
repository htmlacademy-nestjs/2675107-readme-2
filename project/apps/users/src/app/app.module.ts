import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { ConfigUsersModule, getMongooseOptions } from "@project/shared/config/users"
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AuthenticationModule, UserModule, ConfigUsersModule, MongooseModule.forRootAsync(
      getMongooseOptions()
    )],
  controllers: [],
  providers: [],
})
export class AppModule {}
