import { Table } from 'antd';
import styled from 'styled-components';

import { buyOrders, orderColumns } from '../utils/orderBook';
import { getRowStyle } from '../utils/getRowStyle';

const StyledTable = styled(Table)`
  &.ant-table-wrapper {
    .ant-table {
      & > .ant-table-container {
        & > .ant-table-content {
          & > table {
            & > .ant-table-thead {
              & > tr {
                background: #262626;
                font-size: 12px;
                & > th {
                  color: #8c8c8c;
                  background: #262626;
                  padding: 8px;
                }
              }
            }
            & > .ant-table-tbody {
              background: #262626;
              color: #fff;
              & > tr {
                transition: background-color 0.3s;
                & > td {
                  border: 0;
                  padding: 6px;
                  &.ant-table-cell-row-hover {
                    background: unset;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

function LadderTable() {
  const components = {
    body: {
      row: ({ children, ...restProps }: any) => {
        const record = restProps['data-row-key'];
        return (
          <tr
            {...restProps}
            style={{
              background: getRowStyle(record),
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
      columns={orderColumns}
      dataSource={buyOrders}
      pagination={false}
      components={components}
      rowKey={(record) => record.percentage}
    />
  );
}

export default LadderTable;
