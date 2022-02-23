import { ApiRequest, ApiResponse, Product } from '../../models';
import { connect } from 'mssql';
import { dbConfig } from '../../../config';

const getProductsHandler = async (
  req: ApiRequest,
  res: ApiResponse,
): Promise<void> => {
  try {
    const pool = await connect(dbConfig);
    const result = await pool
      .request()
      .query<Product>('SELECT * FROM DemoData.dbo.Products');

    const records = result && result.recordset;
    console.log(records);
    res.send(records);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
};

export default getProductsHandler;
