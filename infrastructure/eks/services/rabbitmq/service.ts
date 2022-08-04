import * as k8s from '@pulumi/kubernetes';
import cluster from '../../cluster';
import { NAME } from './deployment';

const service = new k8s.core.v1.Service(
  `${NAME}-service`,
  {
    metadata: {
      name: `${NAME}-service`
    },
    spec: {
      // I put Load Balancer here to easily access rabbitMQ dashboard
      // without extra effort
      type: 'LoadBalancer',
      ports: [
        { port: 5672, targetPort: 5672, name: 'queue' },
        { port: 15672, targetPort: 15672, name: 'dashboard' }
      ],
      selector: { app: NAME }
    }
  },
  { provider: cluster.provider }
);

export default service;
