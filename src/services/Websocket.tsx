import { useCallback, useEffect, useRef } from 'react';

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
  const ws = useRef<WebSocket | null>(null);

  const handleOpen = useCallback(() => {
    if (ws.current) {
      ws.current.send(
        JSON.stringify({
          type: 'subscribe',
          product_ids: [selectedPair],
          channels: ['level2_batch', 'ticker_batch'],
        }),
      );
    }
  }, [selectedPair]);

  const handleError = useCallback((event: Event) => {
    console.error('handleError', event);
  }, []);

  const handleClose = useCallback(() => {
    setPairAsks(null);
    setPairBids(null);
  }, [setPairAsks, setPairBids]);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
      const data: WebSocketData = JSON.parse(event.data);

      switch (data.type) {
        case 'ticker': {
          handleTickerMessage({ data, setPairTicker });
          break;
        }
        case 'snapshot': {
          handleSnapshotMessage({ data, setPairAsks, setPairBids });
          break;
        }
        case 'l2update': {
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
          break;
        }
        default:
          break;
      }
    },
    [
      pairAsks,
      pairBids,
      aggregation,
      setPairTicker,
      setPairAsks,
      setPairBids,
      setAggregatedAsks,
      setAggregatedBids,
      setOrdersSize,
    ],
  );

  useEffect(() => {
    ws.current = new WebSocket('wss://ws-feed.exchange.coinbase.com');

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [selectedPair]);

  useEffect(() => {
    if (ws.current) {
      ws.current.onopen = handleOpen;
      ws.current.onerror = handleError;
      ws.current.onclose = handleClose;
    }
  }, [handleOpen, handleError, handleClose]);

  useEffect(() => {
    if (ws.current) {
      ws.current.onmessage = handleMessage;
    }
  }, [handleMessage]);

  return null;
};

export default WebSocketComponent;
