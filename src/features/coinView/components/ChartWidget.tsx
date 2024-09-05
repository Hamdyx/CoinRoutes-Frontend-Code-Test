import { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush, ResponsiveContainer, Legend } from 'recharts';
import dayjs from 'dayjs';
import { Grid } from 'antd';

import themeToken from '@lib/theme/tokens';
import { useCoinPairStore } from '@/stores/coinPair';
import { ChartData } from '@/types';

const { useBreakpoint } = Grid;

function ChartWidget() {
  const screens = useBreakpoint();
  const { aggregatedAsks, aggregatedBids } = useCoinPairStore();
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
    if (aggregatedAsks?.length && aggregatedBids?.length) {
      const [askPrice] = aggregatedAsks[0];
      const [bidPrice] = aggregatedBids[0];
      const newItem = {
        name: dayjs(new Date()).format('hh:mm:ss'),
        asks: +askPrice,
        bids: +bidPrice,
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
  }, [aggregatedAsks, aggregatedBids]);

  return (
    <ResponsiveContainer width="100%" height={screens.md ? 800 : 500}>
      <LineChart width={500} height={screens.md ? 800 : 500} data={dataArr}>
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
