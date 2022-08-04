import rds from './rds';
import eks from './eks';

export const dbHost = rds.address;
export const clusterName = eks.cluster.core.cluster.name;
export const clusterKubeconfig = eks.cluster.kubeconfig;
