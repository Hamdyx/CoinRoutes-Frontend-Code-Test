import { aggregateOrders } from '@/utils/aggregateOrders';
import { sortOrders } from '@/utils/sortOrders';
import type { L2UpdateMessage, Order, PairOrdersParams } from '@/types';

interface Params {
  data: L2UpdateMessage;
  pairAsks: Order[] | null;
  pairBids: Order[] | null;
  aggregation: number;
  setPairOrders: ({ pairAsks, pairBids, aggregatedAsks, aggregatedBids, ordersSize }: PairOrdersParams) => void;
}

export const handleL2UpdateMessage = ({ data, pairAsks, pairBids, aggregation, setPairOrders }: Params) => {
  const ordersData: Record<string, Order[]> = {
    sell: pairAsks ?? [],
    buy: pairBids ?? [],
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
  const { orders: aggrAsks, totalSize: totalAsksSize } = aggregateOrders(slicedAsksData, aggregation);
  const { orders: aggrBids, totalSize: totalBidsSize } = aggregateOrders(slicedBidsData, aggregation);
  setPairOrders({
    pairAsks: slicedAsksData,
    pairBids: slicedBidsData,
    aggregatedAsks: aggrAsks.slice(0, 15),
    aggregatedBids: aggrBids.slice(0, 15),
    ordersSize: {
      asks: totalAsksSize,
      bids: totalBidsSize,
    },
  });
};
