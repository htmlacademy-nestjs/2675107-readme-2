import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { BaseMongoRepository } from '@project/shared/core'
import { InjectModel } from "@nestjs/mongoose";
import { UserModel } from "./user.model";
import { Model } from "mongoose";

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(
    @InjectModel(UserModel.name) blogUserModel: Model<UserModel>
  ) {
    super(blogUserModel, UserEntity.fromObject);
  }
  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return this.createEntityFromDocument(document);
  }
}
