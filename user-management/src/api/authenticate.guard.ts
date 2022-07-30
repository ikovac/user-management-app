import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { auth, claimIncludes } from 'express-oauth2-jwt-bearer';
import { promisify } from 'util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    );
    const { domain, identifier } = this.configService.get('auth');

    const authenticate = auth({
      audience: identifier,
      issuer: `https://${domain}/`,
      jwksUri: `https://${domain}/.well-known/jwks.json`,
      tokenSigningAlg: 'RS256'
    });
    const pAuthenticate = promisify(authenticate);
    try {
      await pAuthenticate(request, response);
    } catch (error) {
      throw new UnauthorizedException();
    }

    if (!permissions.length) return true;
    const requiredPermissions = claimIncludes.bind(null, 'permissions');
    const checkPermissions = requiredPermissions(...permissions);
    const pCheckPermissions = promisify(checkPermissions);
    try {
      await pCheckPermissions(request, response);
    } catch (error) {
      throw new ForbiddenException();
    }

    return true;
  }
}
