import * as awsx from '@pulumi/awsx';

const vpc = new awsx.ec2.Vpc('vpc', {
  numberOfAvailabilityZones: 2,
  tags: { Name: 'st-vpc' }
});

export default vpc;
