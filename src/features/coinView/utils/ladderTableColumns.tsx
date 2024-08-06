import { Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { formatNumber } from '@/utils/formatNumbers';
import themeToken from '@lib/theme/tokens';
import withLoadingSkeleton from '@/components/HOCs/withLoadingSkeleton';
import type { TableOrder } from '@/types';

const { Text } = Typography;

export const ladderTableColumns = (
  type: 'bids' | 'asks',
  isLoading: boolean,
): ColumnsType<TableOrder | Record<string, number>> => [
  {
    title: 'Market Size',
    dataIndex: 'market_size',
    render: withLoadingSkeleton(isLoading, (val: number) => formatNumber(val)),

    width: 140,
  },
  {
    title: 'Price (USD)',
    dataIndex: 'price',

    render: withLoadingSkeleton(isLoading, (val: number) => (
      <Text
        style={{
          color: type === 'bids' ? themeToken['green-7'] : themeToken['red-7'],
        }}
      >
        {formatNumber(val)}
      </Text>
    )),
    width: 100,
  },
  {
    title: 'My Size',
    dataIndex: 'my_size',
    render: withLoadingSkeleton(isLoading, (val: number) => formatNumber(val)),
    width: 100,
  },
];
