import { AggregatedOrders, Order } from '@/types';

import { roundPrice } from './roundPrice';

export const aggregateOrders = (orders: Order[], aggregator: number): AggregatedOrders => {
  const aggregated: Record<string, number> = {};
  let totalSize = 0;
  orders.forEach(([price, size]) => {
    totalSize += parseFloat(size);
    const roundedPrice = roundPrice(parseFloat(price), aggregator).toFixed(2);
    if (aggregated[roundedPrice]) {
      aggregated[roundedPrice] += parseFloat(size);
    } else {
      aggregated[roundedPrice] = parseFloat(size);
    }
  });

  return {
    orders: Object.entries(aggregated).map(([price, size]) => [price, size.toFixed(8)]),
    totalSize,
  };
};
