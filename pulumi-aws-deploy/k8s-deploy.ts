import { Input } from '@pulumi/pulumi';
import { awsProfile } from './config';
import { Cluster } from '@pulumi/eks';
import * as k8s from '@pulumi/kubernetes';

const createCluster = (name: string): Cluster => {
  const clusterName = `${name}-cluster`;
  return new Cluster(clusterName, {
    name: clusterName,
    providerCredentialOpts: {
      profileName: awsProfile,
    },
  });
};

export const createK8sDeployment = (
  serviceName: string,
  imageName: Input<string>,
): k8s.core.v1.Service => {
  const cluster = createCluster(serviceName);
  const appLabels = { app: serviceName };

  new k8s.apps.v1.Deployment(
    `${serviceName}-deploy`,
    {
      spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
          metadata: { labels: appLabels },
          spec: {
            containers: [
              {
                name: serviceName,
                image: imageName,
                //ports: [{containerPort: 80, protocol: 'TCP' }]
              },
            ],
          },
        },
      },
    },
    { provider: cluster.provider },
  );

  const appService = new k8s.core.v1.Service(
    `${serviceName}-svc`,
    {
      metadata: { labels: appLabels },
      spec: {
        type: 'LoadBalancer',
        ports: [
          {
            port: 80, // Port to expose
            targetPort: 80, // Container port
            protocol: 'TCP',
          },
        ],
        selector: appLabels,
      },
    },
    { provider: cluster.provider },
  );

  return appService;
};
