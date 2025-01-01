// infrastructure/lib/constructs/database.ts
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export class DatabaseConstruct extends Construct {
  public readonly instance: rds.DatabaseInstance;
  public readonly securityGroup: ec2.SecurityGroup;
  public readonly secret: secretsmanager.Secret;

  constructor(scope: Construct, id: string, vpc: ec2.Vpc) {
    super(scope, id);

    this.securityGroup = new ec2.SecurityGroup(this, 'ijl-db-sg', {
      vpc,
      description: 'Security group for RDS instance',
    });

    this.securityGroup.addIngressRule(
      ec2.Peer.ipv4('0.0.0.0/0'),
      ec2.Port.tcp(3306),
      'Allow external connections from anywhere to RDS MySQL instance',
    );

    this.secret = new secretsmanager.Secret(this, 'ijl-db-secret', {
      secretName: 'ijl-app-secret',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'admin', app_port: 80, node_env: 'production' }),
        generateStringKey: 'password',
        excludePunctuation: true,
        includeSpace: false,
      },
    });

    this.instance = new rds.DatabaseInstance(this, 'ijl-db', {
      instanceIdentifier: 'ijl-db-prod',
      engine: rds.DatabaseInstanceEngine.mysql({
        version: rds.MysqlEngineVersion.VER_8_0_39,
      }),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PUBLIC,
      },
      publiclyAccessible: true,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      securityGroups: [this.securityGroup],
      databaseName: 'ijl',
      credentials: rds.Credentials.fromSecret(this.secret),
      multiAz: false,
      allocatedStorage: 20,
    });
  }
}
