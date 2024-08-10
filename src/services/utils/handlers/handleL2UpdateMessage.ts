import { aggregateOrders } from '@/utils/aggregateOrders';
import { sortOrders } from '@/utils/sortOrders';
import type { L2UpdateMessage, Order, OrdersSize } from '@/types';

interface Params {
  data: L2UpdateMessage;
  pairAsks: Order[] | null;
  pairBids: Order[] | null;
  setPairAsks: (pairAsks: Order[] | null) => void;
  setPairBids: (pairBids: Order[] | null) => void;
  aggregation: number;
  setAggregatedAsks: (aggregatedAsks: Order[] | null) => void;
  setAggregatedBids: (aggregatedrBids: Order[] | null) => void;
  setOrdersSize: (ordersSize: OrdersSize | null) => void;
}

export const handleL2UpdateMessage = ({
  data,
  pairAsks,
  pairBids,
  setPairAsks,
  setPairBids,
  aggregation,
  setAggregatedAsks,
  setAggregatedBids,
  setOrdersSize,
}: Params) => {
  const ordersData: Record<string, Order[]> = {
    sell: pairAsks ? [...pairAsks] : [],
    buy: pairBids ? [...pairBids] : [],
  };

  data.changes.forEach((el: string[]) => {
    const [type, price, size] = el;
    const orderIndex = ordersData[type].findIndex((prevOrder) => prevOrder[0] === price);

    if (orderIndex >= 0) {
      if (parseFloat(size) > 0) {
        ordersData[type][orderIndex][1] = size;
      } else {
        ordersData[type].splice(orderIndex, 1);
      }
    } else if (parseFloat(size) > 0) {
      ordersData[type].push([price, size]);
    }
  });

  const slicedAsksData = sortOrders(ordersData.sell, 'sell').slice(0, 300);
  const slicedBidsData = sortOrders(ordersData.buy, 'buy').slice(0, 300);
  setPairAsks(slicedAsksData);
  setPairBids(slicedBidsData);
  const { orders: aggrAsks, totalSize: totalAsksSize } = aggregateOrders(slicedAsksData, aggregation);
  const { orders: aggrBids, totalSize: totalBidsSize } = aggregateOrders(slicedBidsData, aggregation);
  setAggregatedAsks(aggrAsks.slice(0, 15));
  setAggregatedBids(aggrBids.slice(0, 15));
  setOrdersSize({
    asks: totalAsksSize,
    bids: totalBidsSize,
  });
};
