#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { NetworkingStack } from '../lib/networking-stack';
const app = new cdk.App();
new NetworkingStack(app, 'NetworkingStack');
