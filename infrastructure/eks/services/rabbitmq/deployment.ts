import * as k8s from '@pulumi/kubernetes';
import * as pulumi from '@pulumi/pulumi';
import cluster from '../../cluster';

const rabbitMqConfig = new pulumi.Config('rabbitmq');

export const NAME = 'rabbitmq';

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
              image: 'rabbitmq:3-management',
              name: NAME,
              env: [
                {
                  name: 'RABBITMQ_DEFAULT_USER',
                  value: rabbitMqConfig.require('user')
                },
                {
                  name: 'RABBITMQ_DEFAULT_PASS',
                  value: rabbitMqConfig.requireSecret('password')
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
