import { useEffect } from 'react';

import { useCoinPairStore } from '@/stores/coinPair';

const WebSocketComponent = () => {
  const { selectedPair, pairAsks, pairBids, setPairTicker, setPairAsks, setPairBids } = useCoinPairStore();

  useEffect(() => {
    const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');
    if (selectedPair) {
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: 'subscribe',
            product_ids: [selectedPair],
            channels: ['level2_batch', 'ticker_batch'],
          }),
        );
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'ticker') {
          setPairTicker(data);
        }
        if (data.type === 'snapshot') {
          const asks = data.asks;
          const bids = data.bids;
          console.log('data.type = snapshot', { data, asks, bids });
          setPairAsks(asks);
          setPairBids(bids);
        }
        if (data.type === 'l2update') {
          const ordersData: { [key: string]: string[][] } = {
            sell: pairAsks?.length ? [...pairAsks] : [],
            buy: pairBids?.length ? [...pairBids] : [],
          };

          data.changes.forEach((el: string[]) => {
            const [type, price, size] = el;

            const orderIndex = ordersData[type].findIndex((prevOrder) => prevOrder[1] === price);
            if (orderIndex >= 0) {
              ordersData[type][orderIndex][1] = size;
            } else {
              ordersData[type].push([price, size]);
            }
          });

          ordersData['sell'] = ordersData['sell'].filter((el) => +el[1] > 0).sort((a, b) => +a[0] - +b[0]);
          ordersData['buy'] = ordersData['buy'].filter((el) => +el[1] > 0).sort((a, b) => +b[0] - +a[0]);

          setPairAsks(ordersData['sell']);
          setPairBids(ordersData['buy']);
          console.log('data.type = l2update', { data, newAsks: ordersData['sell'], newBids: ordersData['buy'] });
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }

    return () => {
      ws.close();
    };
  }, [selectedPair]);

  return null;
};

export default WebSocketComponent;
