import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Ticker } from '@/types';

interface CoinPairState {
  selectedPair: string | null;
  setSelectedPair: (pair: string | null) => void;
  pairTicker: Ticker | null;
  setPairTicker: (pairTicker: Ticker | null) => void;
}

export const useCoinPairStore = create<CoinPairState>()(
  devtools(
    persist(
      (set) => ({
        selectedPair: null,
        setSelectedPair: (selectedPair) => set(() => ({ selectedPair })),
        pairTicker: null,
        setPairTicker: (pairTicker) => set(() => ({ pairTicker })),
      }),
      { name: 'coinPairStore' },
    ),
  ),
);
