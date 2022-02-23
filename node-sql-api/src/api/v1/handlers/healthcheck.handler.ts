import { ApiRequest, ApiResponse } from '../../models';

const healthCheckHandler = (req: ApiRequest, res: ApiResponse): void => {
  res.send(`healthy:${new Date().toISOString()}`);
};

export default healthCheckHandler;
