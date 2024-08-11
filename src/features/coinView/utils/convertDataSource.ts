import { Order, OrdersSize } from '@/types';

interface Params {
  dataArr: Order[] | null;
  ordersSize: OrdersSize | null;
  type: 'asks' | 'bids';
}

export const convertDataSource = ({ dataArr, ordersSize, type }: Params) => {
  if (dataArr && ordersSize) {
    return dataArr.map((el, i) => {
      const [price, market_size] = el;
      const percentage = (+market_size / ordersSize[type]) * 100;
      return {
        // * sets the key as the type & percentage to the total size to style the row background
        // * add the index to the key to keep it unique
        key: `${i}-${type}-${percentage}`,
        market_size,
        price,
        my_size: 0,
      };
    });
  }
  return [];
};
