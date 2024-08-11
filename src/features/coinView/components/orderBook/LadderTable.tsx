import { useMemo } from 'react';

import { useCoinPairStore } from '@/stores/coinPair';
import { StyledTable } from '@/lib/theme/components/Table';
import { skeletonsLoading } from '@/utils/skeletonsLoading';
import type { Order } from '@/types';

import { ladderTableColumns } from '../../utils/ladderTableColumns';
import { convertDataSource } from '../../utils/convertDataSource';
import LadderTableRow from './LadderTableRow';

interface Props {
  type: 'bids' | 'asks';
  dataArr: Order[] | null;
  showHeader?: boolean;
}

function LadderTable({ type, dataArr, showHeader = true }: Props) {
  const { ordersSize } = useCoinPairStore();

  const dataSource = convertDataSource({ dataArr, ordersSize, type });
  const tableColumns = useMemo(() => ladderTableColumns(type, dataSource.length === 0), [type, dataSource.length]);

  const components = useMemo(
    () => ({
      body: {
        row: LadderTableRow,
      },
    }),
    [],
  );

  return (
    <StyledTable
      columns={tableColumns}
      dataSource={dataSource.length === 0 ? skeletonsLoading(10) : dataSource.slice(0, 15)}
      pagination={false}
      components={components}
      showHeader={showHeader}
      scroll={{ y: 300 }}
    />
  );
}

export default LadderTable;
