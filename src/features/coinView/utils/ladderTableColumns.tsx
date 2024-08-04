import { Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { formatNumber } from '@/utils/formatNumbers';
import themeToken from '@lib/theme/tokens';
import type { Order } from '@/types';

const { Text } = Typography;

export const ladderTableColumns = (type: 'bids' | 'asks'): ColumnsType<Order | Record<string, number>> => [
  {
    title: 'Market Size',
    dataIndex: 'market_size',
    render: (val: number) => formatNumber(val),
    width: 140,
  },
  {
    title: 'Price (USD)',
    dataIndex: 'price',
    render: (val: number) => (
      <Text
        style={{
          color: type === 'bids' ? themeToken['green-7'] : themeToken['red-7'],
        }}
      >
        {formatNumber(val)}
      </Text>
    ),
    width: 100,
  },
  {
    title: 'My Size',
    dataIndex: 'my_size',
    render: (val: number) => formatNumber(val),
    width: 100,
  },
];
