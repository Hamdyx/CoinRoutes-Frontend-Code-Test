import { useEffect } from 'react';

import { useCoinPairStore } from '@/stores/coinPair';
import type { WebSocketData } from '@/types';

import { handleL2UpdateMessage, handleSnapshotMessage, handleTickerMessage } from './utils';

const WebSocketComponent = () => {
  const {
    selectedPair,
    pairAsks,
    pairBids,
    setPairTicker,
    setPairAsks,
    setPairBids,
    aggregation,
    setAggregatedAsks,
    setAggregatedBids,
    setOrdersSize,
  } = useCoinPairStore();

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
        const data: WebSocketData = JSON.parse(event.data);
        if (data.type === 'ticker') {
          handleTickerMessage({ data, setPairTicker });
        }
        if (data.type === 'snapshot') {
          handleSnapshotMessage({ data, setPairAsks, setPairBids });
        }
        if (data.type === 'l2update') {
          handleL2UpdateMessage({
            data,
            pairAsks,
            pairBids,
            setPairAsks,
            setPairBids,
            aggregation,
            setAggregatedAsks,
            setAggregatedBids,
            setOrdersSize,
          });
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
