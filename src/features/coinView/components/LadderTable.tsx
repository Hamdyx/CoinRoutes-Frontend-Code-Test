import { useMemo } from 'react';

import { useCoinPairStore } from '@/stores/coinPair';
import { StyledTable } from '@/lib/theme/components/Table';

import { getRowStyle } from '../utils/getRowStyle';
import { ladderTableColumns } from '../utils/ladderTableColumns';

type Props = {
  type: 'bids' | 'asks';
  dataArr: string[][] | null;
  showHeader?: boolean;
};

function LadderTable({ type, dataArr, showHeader = true }: Props) {
  const { pairTicker } = useCoinPairStore();
  const tableColumns = ladderTableColumns(type);

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

  const components = {
    body: {
      row: ({ children, ...restProps }: any) => {
        const record = restProps['data-row-key'];
        return (
          <tr
            {...restProps}
            style={{
              background: getRowStyle(record, type),
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
      dataSource={dataSource}
      pagination={false}
      components={components}
      showHeader={showHeader}
    />
  );
}

export default LadderTable;
