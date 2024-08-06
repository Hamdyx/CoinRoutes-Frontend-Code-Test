import { useMemo } from 'react';

import { useCoinPairStore } from '@/stores/coinPair';
import { StyledTable } from '@/lib/theme/components/Table';
import { skeletonsLoading } from '@/utils/skeletonsLoading';

import { ladderTableColumns } from '../../utils/ladderTableColumns';
import LadderTableRow from './LadderTableRow';

type Props = {
  type: 'bids' | 'asks';
  dataArr: string[][] | null;
  showHeader?: boolean;
};

function LadderTable({ type, dataArr, showHeader = true }: Props) {
  const { pairTicker } = useCoinPairStore();

  const dataSource = useMemo(() => {
    if (pairTicker?.last_size) {
      return dataArr?.map((el, i) => {
        const [price, market_size] = el;

        return {
          // * sets the key as the type & percentage to the total size to style the row background
          // * add the index to the key to keep it unique
          key: `${i}-${type}-${+market_size / +pairTicker?.last_size}`,
          market_size,
          price,
          my_size: 0,
        };
      });
    } else return [];
  }, [dataArr, pairTicker?.last_size]);

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
