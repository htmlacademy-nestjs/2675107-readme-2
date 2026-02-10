export class FollowsEntity {
  public id?: string;
  public followerId: string;
  public followingId: string;

  constructor(data: Partial<FollowsEntity>) {
    Object.assign(this, data);
  }

  public toPOJO() {
    return {
      followerId: this.followerId,
      followingId: this.followingId,
    };
  }

   static fromObject(data: any): FollowsEntity {
    return new FollowsEntity({
      ...data,
      id: data._id?.toString(),
    });
  }
}
