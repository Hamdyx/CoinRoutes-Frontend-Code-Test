import styled from 'styled-components';
import { Table } from 'antd';

import themeToken from '../tokens';

const defaultTheme = {};

export const tableTheme = {
  ...defaultTheme,
};

export const StyledTable = styled(Table)`
  &.ant-table-wrapper {
    .ant-table {
      & > .ant-table-container {
        & > .ant-table-content {
          & > table {
            & > .ant-table-thead {
              & > tr {
                background: ${themeToken['gray-10']};
                font-size: ${themeToken.fontSizeSM}px;
                & > th {
                  color: #8c8c8c;
                  background: ${themeToken['gray-10']};
                  padding: ${themeToken.paddingXS}px;
                }
              }
            }
            & > .ant-table-tbody {
              background: ${themeToken['gray-10']};
              color: ${themeToken.colorWhite};
              & > tr {
                transition: background-color 0.3s;
                & > td {
                  border: 0;
                  padding: ${themeToken.paddingXXS}px;
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
