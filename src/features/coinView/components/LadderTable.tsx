import { useMemo } from 'react';

import { useCoinPairStore } from '@/stores/coinPair';
import { StyledTable } from '@/lib/theme/components/Table';
import { skeletonsLoading } from '@/utils/skeletonsLoading';

import { getRowStyle } from '../utils/getRowStyle';
import { ladderTableColumns } from '../utils/ladderTableColumns';

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
          // * sets the key as the percentage to the total size to style the row background
          // * add the index to the key to keep it unique
          key: `${i}-${+market_size / +pairTicker?.last_size}`,
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
      row: ({ children, ...restProps }: any) => {
        const record = restProps['data-row-key'];
        return (
          <tr
            {...restProps}
            style={{
              //* if record type is not string means it's the dummy data for skeleton
              background: typeof record === 'string' ? getRowStyle(record, type) : '',
            }}
          >
            {children}
          </tr>
        );
      },
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
