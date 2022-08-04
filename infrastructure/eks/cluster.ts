import * as eks from '@pulumi/eks';
import vpc from '../vpc';

const cluster = new eks.Cluster('eks-cluster', {
  name: 'user-management-cluster',
  vpcId: vpc.id,
  publicSubnetIds: vpc.publicSubnetIds,
  privateSubnetIds: vpc.privateSubnetIds,
  instanceType: 't2.medium',
  desiredCapacity: 1
});

export default cluster;
