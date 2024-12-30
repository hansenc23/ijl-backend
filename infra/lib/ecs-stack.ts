import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';

interface EcsStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
}

export class EcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EcsStackProps) {
    super(scope, id, props);

    const cluster = new ecs.Cluster(this, 'AppCluster', {
      vpc: props.vpc,
    });

    // Define a Fargate service using the Application Load Balancer
    new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'FargateService', {
      cluster,
      taskImageOptions: {
        image: ecs.ContainerImage.fromAsset('../nestjs-app'), // Build from Dockerfile
        containerPort: 3000,
      },
      memoryLimitMiB: 512,
      cpu: 256,
      desiredCount: 2,
      publicLoadBalancer: true,
    });
  }
}
