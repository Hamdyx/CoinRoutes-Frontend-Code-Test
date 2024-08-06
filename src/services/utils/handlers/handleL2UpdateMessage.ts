import type { L2UpdateMessage } from '@/types';

type Params = {
  data: L2UpdateMessage;
  pairAsks: string[][] | null;
  pairBids: string[][] | null;
  setPairAsks: (pairAsks: string[][] | null) => void;
  setPairBids: (pairBids: string[][] | null) => void;
};

export const handleL2UpdateMessage = ({ data, pairAsks, pairBids, setPairAsks, setPairBids }: Params) => {
  const ordersData: { [key: string]: string[][] } = {
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

  setPairAsks(ordersData['sell']);
  setPairBids(ordersData['buy']);
};
