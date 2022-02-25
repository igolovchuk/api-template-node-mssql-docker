import { interpolate } from '@pulumi/pulumi';
import { appBaseName } from './config';
import { createImage } from './image';
import { createK8sDeployment } from './k8s-deploy';

const image = createImage(appBaseName);
const appService = createK8sDeployment(appBaseName, image.imageName);

export const baseImageName = image.baseImageName;
export const fullImageName = image.imageName;
export const appUrl = interpolate`http://${appService.status.loadBalancer.ingress[0].hostname}/v1/health`;
