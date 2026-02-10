import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T;

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T[];

export function fillDto<T, V>(
  DtoClass: new () => T,
  plainObject: V,
  options?: ClassTransformOptions,
): T | T[] {
  return plainToInstance(DtoClass, plainObject, {
      excludeExtraneousValues: true,
      ...options,
  });
}

type MongoConnectionOptions = {
  username: string;
  password: string;
  host: string;
  port: string;
  databaseName: string;
  authDatabase: string;
};

type RabbitConnectionOptions = {
  user: string;
  password: string;
  host: string;
  port: string;

};

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}: MongoConnectionOptions): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getRabbitMQConnectionString({user, password, host, port}: RabbitConnectionOptions): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}
