import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserModule } from './user/user.module';
import { ConfigUsersModule, getMongooseOptions } from "@project/shared/config/users"
import { MongooseModule } from '@nestjs/mongoose';
import { FollowsModule } from './follows/follows.module';

@Module({
  imports: [AuthenticationModule, UserModule, FollowsModule, ConfigUsersModule, MongooseModule.forRootAsync(
      getMongooseOptions()
    )],
  controllers: [],
  providers: [],
})
export class AppModule {}
