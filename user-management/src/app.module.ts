import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './api/user.controller';
import authConfig from './config/auth.config';
import databaseConfig from './config/database.config';
import rabbitmqConfig from './config/rabbitmq.config';
import User from './core/user.entity';
import entities from './shared/database/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, rabbitmqConfig, authConfig]
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        loadStrategy: LoadStrategy.JOINED,
        ...config.get('database'),
        entities
      })
    }),
    MikroOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_MANAGEMENT_EVENT_PUBLISHER',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { url, queue } = configService.get('rabbitmq');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [url],
            queue,
            queueOptions: { durable: false }
          }
        });
      }
    }
  ]
})
export class AppModule {}
