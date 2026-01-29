import { NotFoundException } from '@nestjs/common';
import { Repository } from './repository.interface';
import { Entity, EntityIdType } from './entity.interface';

export abstract class BasePrismaRepository<
  EntityType extends Entity<EntityIdType>,
  PrismaModel,
  PrismaCreateInput,
  PrismaUpdateInput
> implements Repository<EntityType> {

  constructor(
    protected readonly client: any,
    protected readonly prisma: PrismaModel,
    private readonly createEntity: (data: any) => EntityType,
  ) {}

  protected toEntity(data: any): EntityType | null {
    if (!data) {
      return null;
    }

    return this.createEntity(data);
  }

  protected async withTransaction<T>(
    handler: (tx: any) => Promise<T>,
  ): Promise<T> {
    return this.client.$transaction(handler);
  }


  public async findById(id: EntityType['id']): Promise<EntityType | null> {
    const record = await (this.prisma as any).findUnique({
      where: { id },
    });

    return this.toEntity(record);
  }

  public async save(entity: EntityType): Promise<EntityType> {
    const record = await (this.prisma as any).create({
      data: entity.toPOJO() as PrismaCreateInput,
    });

    entity.id = record.id;
    return entity;
  }

  public async update(
    id: EntityType['id'],
    entity: EntityType,
  ): Promise<EntityType> {
    try {
      await (this.prisma as any).update({
        where: { id },
        data: entity.toPOJO() as PrismaUpdateInput,
      });

      return entity;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }

  public async deleteById(id: EntityType['id']): Promise<void> {
    try {
      await (this.prisma as any).delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}
