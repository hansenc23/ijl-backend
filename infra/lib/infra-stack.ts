import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NetworkConstruct } from './constructs/network';
import { DatabaseConstruct } from './constructs/database';
import { ServiceConstruct } from './constructs/ecs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const network = new NetworkConstruct(this, 'Network');
    const database = new DatabaseConstruct(this, 'Database', network.vpc);
    new ServiceConstruct(this, 'Service', network.vpc, database.securityGroup, database.secret);
  }
}
