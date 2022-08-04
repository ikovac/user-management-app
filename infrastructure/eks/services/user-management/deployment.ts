import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import db from '../../../rds';
import cluster from '../../cluster';
import rabbitMqService from '../rabbitmq/service';

const userManagementServiceConfig = new pulumi.Config(
  'user-management-service'
);
const rabbitMqConfig = new pulumi.Config('rabbitmq');
const auth0Config = new pulumi.Config('auth0');

export const NAME = 'user-management';

const deployment = new k8s.apps.v1.Deployment(
  `${NAME}-deployment`,
  {
    metadata: { name: NAME },
    spec: {
      replicas: 1,
      selector: {
        matchLabels: { app: NAME }
      },
      template: {
        metadata: {
          labels: { app: NAME }
        },
        spec: {
          containers: [
            {
              image: userManagementServiceConfig.require('docker-image'),
              name: NAME,
              env: [
                { name: 'DB_HOST', value: db.address },
                {
                  name: 'DB_PORT',
                  value: db.port.apply((port) => String(port))
                },
                { name: 'DB_NAME', value: db.name },
                { name: 'DB_USER', value: db.username },
                {
                  name: 'DB_PASSWORD',
                  value: db.password.apply((password) => password || '')
                },
                {
                  name: 'RABBITMQ_USER',
                  value: rabbitMqConfig.require('user')
                },
                {
                  name: 'RABBITMQ_PASSWORD',
                  value: rabbitMqConfig.requireSecret('password')
                },
                {
                  name: 'RABBITMQ_HOST',
                  value: rabbitMqService.status.loadBalancer.ingress[0].hostname
                },
                { name: 'RABBITMQ_PORT', value: '5672' },
                { name: 'AUTH0_DOMAIN', value: auth0Config.require('domain') },
                {
                  name: 'AUTH0_IDENTIFIER',
                  value: auth0Config.require('identifier')
                }
              ]
            }
          ]
        }
      }
    }
  },
  { provider: cluster.provider }
);

export default deployment;
