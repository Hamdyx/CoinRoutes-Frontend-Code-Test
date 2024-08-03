import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface CoinPairState {
  selectedPair: string | null;
  setSelectedPair: (pair: string | null) => void;
}

export const useCoinPairStore = create<CoinPairState>()(
  devtools(
    persist(
      (set) => ({
        selectedPair: null,
        setSelectedPair: (selectedPair) => set(() => ({ selectedPair })),
      }),
      { name: 'coinPairStore' },
    ),
  ),
);
