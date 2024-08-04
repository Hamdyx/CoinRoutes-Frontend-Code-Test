import { useEffect } from 'react';

import { useCoinPairStore } from '@/stores/coinPair';

const WebSocketComponent = () => {
  const { selectedPair, setPairTicker } = useCoinPairStore();

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
        console.log('JSON.parse', { event, data });
        if (data.type === 'ticker') {
          console.log('data.type = ticker', { data });
          setPairTicker(data);
        }
        if (data.type === 'snapchot') {
          console.log('data.type = snapchot', { data });
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
