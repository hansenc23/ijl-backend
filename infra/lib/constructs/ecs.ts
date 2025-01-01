import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

import { Construct } from 'constructs';

export class ServiceConstruct extends Construct {
  constructor(
    scope: Construct,
    id: string,
    vpc: ec2.Vpc,
    dbSecurityGroup: ec2.SecurityGroup,
    dbSecret: secretsmanager.Secret,
  ) {
    super(scope, id);

    const cluster = new ecs.Cluster(this, 'ijl-cluster', {
      vpc,
    });

    const repository = ecr.Repository.fromRepositoryName(this, 'ExistingRepository', 'ijl-app-prod');

    const fargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'ijl-service-prod', {
      cluster,
      cpu: 256,
      memoryLimitMiB: 512,
      desiredCount: 1,
      taskImageOptions: {
        image: ecs.ContainerImage.fromEcrRepository(repository),
        secrets: {
          DB_USERNAME: ecs.Secret.fromSecretsManager(dbSecret, 'username'),
          DB_PASSWORD: ecs.Secret.fromSecretsManager(dbSecret, 'password'),
          DB_DATABASE: ecs.Secret.fromSecretsManager(dbSecret, 'dbname'),
          DB_PORT: ecs.Secret.fromSecretsManager(dbSecret, 'port'),
          DB_HOST: ecs.Secret.fromSecretsManager(dbSecret, 'host'),
        },
        containerPort: 80,
      },
    });

    dbSecret.grantRead(fargateService.taskDefinition.taskRole);
    fargateService.service.connections.allowTo(dbSecurityGroup, ec2.Port.tcp(3306), 'Allow connection to database');
  }
}
