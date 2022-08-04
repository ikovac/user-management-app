import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';
import vpc from '../vpc';

const config = new pulumi.Config('db');

const securityGroup = new aws.ec2.SecurityGroup('db-security-group', {
  vpcId: vpc.id,
  ingress: [
    {
      protocol: 'tcp',
      fromPort: 5432,
      toPort: 5432,
      cidrBlocks: ['0.0.0.0/0']
    }
  ]
});

const subnetGroup = new aws.rds.SubnetGroup('db-subnet-group', {
  subnetIds: vpc.publicSubnetIds
});

const db = new aws.rds.Instance('postgres-db', {
  identifier: 'user-management-app',
  allocatedStorage: 20,
  maxAllocatedStorage: 100,
  dbSubnetGroupName: subnetGroup.name,
  engine: 'postgres',
  engineVersion: '13.3',
  instanceClass: 'db.t3.micro',
  publiclyAccessible: true,
  skipFinalSnapshot: true,
  maintenanceWindow: 'Mon:07:00-Mon:07:30',
  vpcSecurityGroupIds: [securityGroup.id],
  name: config.require('name'),
  username: config.require('username'),
  password: config.requireSecret('password')
});

export default db;
