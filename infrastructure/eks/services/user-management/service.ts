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
      type: 'LoadBalancer',
      ports: [{ port: 3000, targetPort: 3000 }],
      selector: { app: NAME }
    }
  },
  { provider: cluster.provider }
);

export default service;
