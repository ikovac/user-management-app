import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import rabbitmqConfig from './rabbitmq.config';
import IdentityProvider from './identity-provider';
import { UserManagementEventHandler } from './user-management.event-handler';

@Module({
  imports: [ConfigModule.forRoot({ load: [rabbitmqConfig] })],
  controllers: [UserManagementEventHandler],
  providers: [IdentityProvider]
})
export class AppModule {}
