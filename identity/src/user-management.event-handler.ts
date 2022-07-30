import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import IdentityProvider, { Role } from './identity-provider';

type UserCreatedEventPayload = {
  email: string;
  firstName: string;
  lastName: string;
  role: Role['name'];
};

@Controller('user-management')
export class UserManagementEventHandler {
  constructor(private identityProvider: IdentityProvider) {}

  @MessagePattern('USER_CREATED')
  createIdentity(
    @Payload() { email, firstName, lastName, role }: UserCreatedEventPayload
  ) {
    return this.identityProvider.createIdentity({
      email,
      firstName,
      lastName,
      role
    });
  }
}
