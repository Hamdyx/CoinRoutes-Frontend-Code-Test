import { processOrders } from '@/utils/processOrders';
import type { L2UpdateMessage, Order, PairOrdersParams } from '@/types';

interface Params {
  data: L2UpdateMessage;
  pairAsks: Order[] | null;
  pairBids: Order[] | null;
  aggregation: number;
  setPairOrders: ({ pairAsks, pairBids, aggregatedAsks, aggregatedBids, ordersSize }: PairOrdersParams) => void;
}

export const handleL2UpdateMessage = ({ data, pairAsks, pairBids, aggregation, setPairOrders }: Params) => {
  if (!data.changes.length) return;

  const ordersData: Record<string, Map<string, string>> = {
    sell: new Map(pairAsks?.map((order) => [order[0], order[1]]) ?? []),
    buy: new Map(pairBids?.map((order) => [order[0], order[1]]) ?? []),
  };

  data.changes.forEach(([type, price, size]) => {
    const parsedSize = parseFloat(size);
    if (parsedSize > 0) {
      ordersData[type].set(price, size);
    } else {
      ordersData[type].delete(price);
    }
  });

  const {
    sortedOrders: sortedAsks,
    aggregatedOrders: aggregatedAsks,
    totalSize: totalAsksSize,
  } = processOrders(ordersData.sell, 'sell', aggregation);
  const {
    sortedOrders: sortedBids,
    aggregatedOrders: aggregatedBids,
    totalSize: totalBidsSize,
  } = processOrders(ordersData.buy, 'buy', aggregation);

  setPairOrders({
    pairAsks: sortedAsks,
    pairBids: sortedBids,
    aggregatedAsks,
    aggregatedBids,
    ordersSize: {
      asks: totalAsksSize,
      bids: totalBidsSize,
    },
  });
};
