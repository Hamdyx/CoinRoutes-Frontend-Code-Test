import { useEffect } from 'react';

import { useCoinPairStore } from '@/stores/coinPair';

const WebSocketComponent = () => {
  const { selectedPair, setPairTicker, setPairAsks, setPairBids } = useCoinPairStore();

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
          const asks = data.asks.slice(0, 10);
          const bids = data.bids.slice(0, 10);
          setPairAsks(asks);
          setPairBids(bids);
        }
        if (data.type === 'l2update') {
          const filteredOrders: string[][] = data.changes.filter((el: string[]) => {
            const [, , size] = el;
            return +size > 0;
          });
          const asks = filteredOrders
            .filter((el) => {
              const [type] = el;
              return type === 'sell';
            })
            .sort((a, b) => +a[1] - +b[1])
            .slice(0, 10);
          const bids = filteredOrders
            .filter((el) => {
              const [type] = el;
              return type === 'buy';
            })
            .sort((a, b) => +b[1] - +a[1])
            .slice(0, 10);
          setPairAsks(
            asks.map((el) => {
              const [, price, size] = el;
              return [price, size];
            }),
          );
          setPairBids(
            bids.map((el) => {
              const [, price, size] = el;
              return [price, size];
            }),
          );

          console.log('data.type = l2update', { data, filteredOrders, asks, bids });
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
