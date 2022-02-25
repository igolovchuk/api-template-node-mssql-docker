import { interpolate, Output } from '@pulumi/pulumi';
import { project, dbUsername, dbPassword } from './config';
import { Image, ImageRegistry } from '@pulumi/docker';
import { Repository as RepositoryConfig } from '@pulumi/awsx/ecr';
import { getCredentials, Repository } from '@pulumi/aws/ecr';
import { Buffer } from 'buffer';

const createRepo = (name: string): RepositoryConfig => {
  return new RepositoryConfig(name, {
    repository: new Repository(name, {
      name: name,
    }),
    lifeCyclePolicyArgs: {
      rules: [
        {
          selection: 'untagged',
          maximumNumberOfImages: 1,
          maximumAgeLimit: 1,
        },
      ],
    },
  });
};

const getRegistry = (repoConfig: RepositoryConfig): Output<ImageRegistry> => {
  return repoConfig.repository.registryId.apply(async (id) => {
    const credentials = await getCredentials({ registryId: id });
    const decodedCredentials = Buffer.from(
      credentials.authorizationToken,
      'base64',
    ).toString();
    const [username, password] = decodedCredentials.split(':');
    if (!password || !username) {
      throw new Error('Invalid credentials');
    }
    return <ImageRegistry>{
      server: credentials.proxyEndpoint,
      username: username,
      password: password,
    };
  });
};

export const createImage = (name: string) => {
  const repoConfig = createRepo(name);
  const registry = getRegistry(repoConfig);
  const imageName = interpolate`${repoConfig.repository.repositoryUrl}:latest`;

  return new Image(name, {
    build: {
      context: `../${project}`,
      args: {
        DB_USERNAME: dbUsername,
        DB_PASSWORD: dbPassword,
      },
    },
    imageName: imageName,
    localImageName: imageName,
    registry: registry,
    skipPush: false,
  });
};
