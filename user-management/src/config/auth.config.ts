import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  domain: process.env.AUTH0_DOMAIN,
  identifier: process.env.AUTH0_IDENTIFIER
}));
