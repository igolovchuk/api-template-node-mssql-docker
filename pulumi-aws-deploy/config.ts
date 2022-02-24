import { Config, getProject, getStack } from '@pulumi/pulumi';

const config = new Config();
const awsConfig = new Config('aws');

export const stack = getStack();
export const project = getProject();

export const appBaseName = `${stack}-${project}`;

export const awsProfile = awsConfig.require('profile');
export const dbUsername = config.requireSecret('dbUsername');
export const dbPassword = config.requireSecret('dbPassword');
