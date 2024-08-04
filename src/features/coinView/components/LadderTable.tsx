import { StyledTable } from '@/lib/theme/components/Table';

import { buyOrders } from '../utils/orderBook';
import { getRowStyle } from '../utils/getRowStyle';
import { ladderTableColumns } from '../utils/ladderTableColumns';

type Props = {
  type: 'bids' | 'asks';
  showHeader?: boolean;
};

function LadderTable({ type, showHeader = true }: Props) {
  const tableColumns = ladderTableColumns(type);

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
      dataSource={buyOrders}
      pagination={false}
      components={components}
      rowKey={(record) => record.percentage}
      showHeader={showHeader}
    />
  );
}

export default LadderTable;
