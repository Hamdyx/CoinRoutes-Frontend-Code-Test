import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Order, OrdersSize, Ticker } from '@/types';

interface CoinPairState {
  selectedPair: string | null;
  setSelectedPair: (pair: string | null) => void;
  pairTicker: Ticker | null;
  setPairTicker: (pairTicker: Ticker | null) => void;
  pairAsks: Order[] | null;
  setPairAsks: (pairAsks: Order[] | null) => void;
  pairBids: Order[] | null;
  setPairBids: (pairBids: Order[] | null) => void;
  aggregation: number;
  setAggregation: (aggregation: number) => void;
  aggregatedAsks: Order[] | null;
  setAggregatedAsks: (aggregatedAsks: Order[] | null) => void;
  aggregatedrBids: Order[] | null;
  setAggregatedBids: (aggregatedrBids: Order[] | null) => void;
  ordersSize: {
    asks: number;
    bids: number;
  } | null;
  setOrdersSize: (ordersSize: OrdersSize | null) => void;
  resetState: () => void;
}

const initialState = {
  selectedPair: null,
  pairTicker: null,
  pairAsks: null,
  pairBids: null,
  aggregation: 0.01,
  aggregatedAsks: null,
  aggregatedrBids: null,
  ordersSize: null,
};

export const useCoinPairStore = create<CoinPairState>()(
  devtools(
    persist(
      (set) => ({
        selectedPair: null,
        setSelectedPair: (selectedPair) => set(() => ({ selectedPair })),
        pairTicker: null,
        setPairTicker: (pairTicker) => set(() => ({ pairTicker })),
        pairAsks: null,
        setPairAsks: (pairAsks) => set(() => ({ pairAsks })),
        pairBids: null,
        setPairBids: (pairBids) => set(() => ({ pairBids })),
        aggregation: 0.01,
        setAggregation: (aggregation) => set(() => ({ aggregation })),
        aggregatedAsks: null,
        setAggregatedAsks: (aggregatedAsks) => set(() => ({ aggregatedAsks })),
        aggregatedrBids: null,
        setAggregatedBids: (aggregatedrBids) => set(() => ({ aggregatedrBids })),
        ordersSize: null,
        setOrdersSize: (ordersSize) => set(() => ({ ordersSize })),
        resetState: () => set(() => initialState),
      }),
      { name: 'coinPairStore' },
    ),
  ),
);
