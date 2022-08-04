import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import cluster from '../../cluster';
import rabbitMqService from '../rabbitmq/service';

const identityServiceConfig = new pulumi.Config('identity-service');
const rabbitMqConfig = new pulumi.Config('rabbitmq');
const auth0Config = new pulumi.Config('auth0');

export const NAME = 'identity';

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
              image: identityServiceConfig.require('docker-image'),
              name: NAME,
              env: [
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
                  name: 'AUTH0_CLIENT_ID',
                  value: auth0Config.require('client-id')
                },
                {
                  name: 'AUTH0_CLIENT_SECRET',
                  value: auth0Config.requireSecret('client-secret')
                },
                {
                  name: 'AUTH0_MANAGEMENT_API_IDENTIFIER',
                  value: auth0Config.require('management-api-identifier')
                },
                {
                  name: 'AUTH0_TEMP_PASSWORD',
                  value: auth0Config.requireSecret('temp-password')
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
