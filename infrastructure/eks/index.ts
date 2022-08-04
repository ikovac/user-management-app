import * as identityService from './services/identity';
import * as rabbitmqService from './services/rabbitmq';
import * as userManagementService from './services/user-management';
import cluster from './cluster';

export default {
  cluster,
  identityService,
  userManagementService,
  rabbitmqService
};
