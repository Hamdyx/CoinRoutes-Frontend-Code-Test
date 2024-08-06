import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Ticker } from '@/types';

interface CoinPairState {
  selectedPair: string | null;
  setSelectedPair: (pair: string | null) => void;
  pairTicker: Ticker | null;
  setPairTicker: (pairTicker: Ticker | null) => void;
  pairAsks: string[][] | null;
  setPairAsks: (pairAsks: string[][] | null) => void;
  pairBids: string[][] | null;
  setPairBids: (pairBids: string[][] | null) => void;
  aggregation: number | null;
  setAggregation: (aggregation: number | null) => void;
  resetState: () => void;
}

const initialState = {
  selectedPair: null,
  pairTicker: null,
  pairAsks: null,
  pairBids: null,
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
        resetState: () => set(() => initialState),
        aggregation: null,
        setAggregation: (aggregation) => set(() => ({ aggregation })),
      }),
      { name: 'coinPairStore' },
    ),
  ),
);
