import { aggregateOrders } from '@/utils/aggregateOrders';
import type { L2UpdateMessage, Order, OrdersSize } from '@/types';

type Params = {
  data: L2UpdateMessage;
  pairAsks: Order[] | null;
  pairBids: Order[] | null;
  setPairAsks: (pairAsks: Order[] | null) => void;
  setPairBids: (pairBids: Order[] | null) => void;
  aggregation: number;
  setAggregatedAsks: (aggregatedAsks: Order[] | null) => void;
  setAggregatedBids: (aggregatedrBids: Order[] | null) => void;
  setOrdersSize: (ordersSize: OrdersSize | null) => void;
};

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
  const ordersData: { [key: string]: Order[] } = {
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

  ordersData['sell'].sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]));
  ordersData['buy'].sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]));
  const slicedAsksData = ordersData['sell'];
  const slicedBidsDat = ordersData['buy'];
  setPairAsks(ordersData['sell'].slice(0, 300));
  setPairBids(ordersData['buy'].slice(0, 300));
  const { orders: aggrAsks, totalSize: totalAsksSize } = aggregateOrders(slicedAsksData, aggregation);
  const { orders: aggrBids, totalSize: totalBidsSize } = aggregateOrders(slicedBidsDat, aggregation);
  setAggregatedAsks(aggrAsks);
  setAggregatedBids(aggrBids);
  setOrdersSize({
    asks: totalAsksSize,
    bids: totalBidsSize,
  });
};
