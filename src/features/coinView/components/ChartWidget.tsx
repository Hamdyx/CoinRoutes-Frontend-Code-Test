import { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer, Legend } from 'recharts';
import dayjs from 'dayjs';

import themeToken from '@lib/theme/tokens';
import { useCoinPairStore } from '@/stores/coinPair';
import { ChartData } from '@/types';
import { Grid } from 'antd';

const { useBreakpoint } = Grid;

function ChartWidget() {
  const screens = useBreakpoint();
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
      const newItem = {
        name: time,
        asks: +best_ask,
        bids: +best_bid,
      };
      if (!dataArr.length) {
        setDataArr([newItem]);
      } else {
        setDataArr((prev) => {
          const arr = [...prev];
          arr.push(newItem);
          if (arr.length > 100) arr.shift();
          return arr;
        });
      }
    } else {
      setDataArr([]);
    }
  }, [pairTicker]);

  return (
    <ResponsiveContainer width="100%" height={screens.md ? 800 : 500}>
      <LineChart width={500} height={screens.md ? 800 : 500} data={dataArr}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickFormatter={(value: string) => dayjs(value).format('hh:mm:ss')} />
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
