import { aggregateOrders } from './aggregateOrders';
import { sortOrders } from './sortOrders';

export const processOrders = (ordersMap: Map<string, string>, type: 'sell' | 'buy', aggregation: number) => {
  const sortedOrders = sortOrders([...ordersMap.entries()], type).slice(0, 300);
  const { orders, totalSize } = aggregateOrders(sortedOrders, aggregation);

  return {
    sortedOrders,
    aggregatedOrders: orders.slice(0, 15),
    totalSize,
  };
};
