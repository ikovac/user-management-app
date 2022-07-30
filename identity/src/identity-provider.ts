import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticationClient, ManagementClient } from 'auth0';
import { ValuesType } from 'utility-types';
import { Role } from './constants';

export type Role = {
  id: string;
  name: ValuesType<typeof Role>;
};

export type Identity = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role['name'];
};

export type CreateIdentityPayload = {
  email: string;
  firstName: string;
  lastName: string;
  role: Role['name'];
};

const CONNECTION = 'Username-Password-Authentication';

@Injectable()
class IdentityProvider {
  private managementClient: ManagementClient;
  private authClient: AuthenticationClient;

  constructor(private configService: ConfigService) {
    this.managementClient = new ManagementClient({
      domain: configService.get('AUTH0_DOMAIN'),
      clientId: configService.get('AUTH0_CLIENT_ID'),
      clientSecret: configService.get('AUTH0_CLIENT_SECRET'),
      audience: configService.get('AUTH0_MANAGEMENT_API_IDENTIFIER')
    });

    this.authClient = new AuthenticationClient({
      domain: configService.get('AUTH0_DOMAIN'),
      clientId: configService.get('AUTH0_CLIENT_ID'),
      clientSecret: configService.get('AUTH0_CLIENT_SECRET')
    });
  }

  async getRoles(): Promise<Role[]> {
    const roles = await this.managementClient.getRoles();
    return roles.map((it) => ({ id: it.id, name: it.name } as Role));
  }

  async createIdentity({
    email,
    firstName,
    lastName,
    role
  }: CreateIdentityPayload): Promise<Identity> {
    const identity = await this.managementClient.createUser({
      email,
      email_verified: false,
      given_name: firstName,
      family_name: lastName,
      password: this.configService.get('AUTH0_TEMP_PASSWORD'),
      connection: CONNECTION
    });

    const roles = await this.getRoles();
    const auth0Role = roles.find((it) => it.name === role);
    await this.managementClient.assignRolestoUser(
      { id: identity.user_id },
      { roles: [auth0Role?.id] }
    );

    await this.authClient.requestChangePasswordEmail({
      email,
      connection: CONNECTION
    });

    return {
      id: identity.user_id,
      firstName: identity.given_name,
      lastName: identity.family_name,
      email: identity.email,
      role: auth0Role.name
    };
  }
}

export default IdentityProvider;
