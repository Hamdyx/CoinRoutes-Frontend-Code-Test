import { useMemo } from 'react';

import { useCoinPairStore } from '@/stores/coinPair';
import { StyledTable } from '@/lib/theme/components/Table';
import { skeletonsLoading } from '@/utils/skeletonsLoading';
import type { Order } from '@/types';

import { ladderTableColumns } from '../../utils/ladderTableColumns';
import LadderTableRow from './LadderTableRow';

type Props = {
  type: 'bids' | 'asks';
  dataArr: Order[] | null;
  showHeader?: boolean;
};

function LadderTable({ type, dataArr, showHeader = true }: Props) {
  const { ordersSize } = useCoinPairStore();

  const dataSource = useMemo(() => {
    if (ordersSize) {
      return dataArr?.map((el, i) => {
        const [price, market_size] = el;
        const percentage = (+market_size / ordersSize[type]) * 100;
        return {
          // * sets the key as the type & percentage to the total size to style the row background
          // * add the index to the key to keep it unique
          key: `${i}-${type}-${percentage}`,
          market_size,
          price,
          my_size: 0,
        };
      });
    } else return [];
  }, [dataArr, ordersSize]);

  const tableColumns = ladderTableColumns(type, dataSource?.length === 0);

  const components = {
    body: {
      row: LadderTableRow,
    },
  };

  return (
    <StyledTable
      columns={tableColumns}
      dataSource={dataSource?.length === 0 ? skeletonsLoading(10) : dataSource?.slice(0, 10)}
      pagination={false}
      components={components}
      showHeader={showHeader}
    />
  );
}

export default LadderTable;
