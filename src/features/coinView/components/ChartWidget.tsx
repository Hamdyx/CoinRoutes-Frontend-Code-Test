import { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer, Legend } from 'recharts';

import themeToken from '@lib/theme/tokens';
import { useCoinPairStore } from '@/stores/coinPair';
import { ChartData } from '@/types';

function ChartWidget() {
  const { pairTicker } = useCoinPairStore();
  const [dataArr, setDataArr] = useState<ChartData[]>([]);

  const minPrice = useMemo(() => {
    const minBids = dataArr.map((el) => +el.bids);
    return Math.min(...minBids);
  }, [dataArr]);
  const maxPrice = useMemo(() => {
    const maxAsks = dataArr.map((el) => +el.asks);
    return Math.max(...maxAsks);
  }, [dataArr]);

  useEffect(() => {
    if (pairTicker) {
      const { time, best_ask, best_bid } = pairTicker;
      if (!dataArr.length) {
        setDataArr([
          {
            name: time,
            asks: +best_ask,
            bids: +best_bid,
          },
        ]);
      } else {
        setDataArr((prev) => [
          ...prev,
          {
            name: time,
            asks: +best_ask,
            bids: +best_bid,
          },
        ]);
      }
    }
  }, [pairTicker?.time]);

  return (
    <ResponsiveContainer width="100%" height={800}>
      <LineChart width={500} height={800} data={dataArr}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[minPrice, maxPrice]} />
        <Tooltip />
        <Line type="monotone" dataKey="bids" stroke={themeToken.green} fill={themeToken.green} strokeWidth={3} />
        <Line type="monotone" dataKey="asks" stroke={themeToken.red} fill={themeToken.red} strokeWidth={3} />
        <Brush />
        <Legend
          layout="vertical"
          verticalAlign="top"
          wrapperStyle={{
            top: 50,
            left: 80,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ChartWidget;
