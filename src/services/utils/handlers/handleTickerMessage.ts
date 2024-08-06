import type { Ticker } from '@/types';

type Params = {
  data: Ticker;
  setPairTicker: (pairTicker: Ticker | null) => void;
};

export const handleTickerMessage = ({ data, setPairTicker }: Params) => {
  setPairTicker(data);
};
