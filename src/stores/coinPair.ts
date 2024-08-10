import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Order, OrdersSize, PairOrdersParams, Ticker } from '@/types';

interface CoinPairState {
  selectedPair: string;
  setSelectedPair: (pair: string) => void;
  pairTicker: Ticker | null;
  setPairTicker: (pairTicker: Ticker | null) => void;
  pairAsks: Order[] | null;
  setPairAsks: (pairAsks: Order[] | null) => void;
  pairBids: Order[] | null;
  setPairBids: (pairBids: Order[] | null) => void;
  setPairOrders: ({ pairAsks, pairBids, aggregatedAsks, aggregatedBids, ordersSize }: PairOrdersParams) => void;
  aggregation: number;
  setAggregation: (aggregation: number) => void;
  aggregatedAsks: Order[] | null;
  setAggregatedAsks: (aggregatedAsks: Order[] | null) => void;
  aggregatedBids: Order[] | null;
  setAggregatedBids: (aggregatedBids: Order[] | null) => void;
  ordersSize: {
    asks: number;
    bids: number;
  } | null;
  setOrdersSize: (ordersSize: OrdersSize | null) => void;
  resetState: () => void;
}

const initialState = {
  selectedPair: 'BTC-USD',
  pairTicker: null,
  pairAsks: null,
  pairBids: null,
  aggregation: 0.01,
  aggregatedAsks: null,
  aggregatedBids: null,
  ordersSize: null,
};

export const useCoinPairStore = create<CoinPairState>()(
  devtools(
    persist(
      (set) => ({
        selectedPair: 'BTC-USD',
        setSelectedPair: (selectedPair) => set(() => ({ selectedPair })),
        pairTicker: null,
        setPairTicker: (pairTicker) => set(() => ({ pairTicker })),
        pairAsks: null,
        setPairAsks: (pairAsks) => set(() => ({ pairAsks })),
        pairBids: null,
        setPairBids: (pairBids) => set(() => ({ pairBids })),
        setPairOrders: ({ pairAsks, pairBids, aggregatedAsks, aggregatedBids, ordersSize }) =>
          set(() => ({
            pairAsks,
            pairBids,
            aggregatedAsks,
            aggregatedBids,
            ordersSize,
          })),
        aggregation: 0.01,
        setAggregation: (aggregation) => set(() => ({ aggregation })),
        aggregatedAsks: null,
        setAggregatedAsks: (aggregatedAsks) => set(() => ({ aggregatedAsks })),
        aggregatedBids: null,
        setAggregatedBids: (aggregatedBids) => set(() => ({ aggregatedBids })),
        ordersSize: null,
        setOrdersSize: (ordersSize) => set(() => ({ ordersSize })),
        resetState: () => set(() => initialState),
      }),
      { name: 'coinPairStore' },
    ),
  ),
);
