import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from './common';

export function getRabbitMQOptions(optionSpace: string) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: config.get<string>(`${optionSpace}.queue`),
          type: 'direct'
        }
      ],
      uri:getRabbitMQConnectionString({
        host: config.getOrThrow<string>(`${optionSpace}.host`),
        password: config.getOrThrow<string>(`${optionSpace}.password`),
        user: config.getOrThrow<string>(`${optionSpace}.user`),
        port: config.getOrThrow<string>(`${optionSpace}.port`),
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService]
  }
}
