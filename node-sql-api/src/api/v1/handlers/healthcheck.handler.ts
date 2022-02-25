import { ApiRequest, ApiResponse } from '../../models';

const healthCheckHandler = (req: ApiRequest, res: ApiResponse): void => {
  res.send({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
};

export default healthCheckHandler;
