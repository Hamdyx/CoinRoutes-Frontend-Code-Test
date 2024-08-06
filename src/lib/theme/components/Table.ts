import styled from 'styled-components';
import { Table } from 'antd';

import themeToken from '../tokens';

const defaultTheme = {};

export const tableTheme = {
  ...defaultTheme,
};

export const StyledTable = styled(Table)<{ showHeader: boolean }>`
  &.ant-table-wrapper {
    min-height: ${(props) => (props.showHeader ? '337px' : '300px')};
    .ant-table {
      & > .ant-table-container {
        background: ${themeToken['gray-10']};
        & > .ant-table-header {
          .ant-table-thead {
            background: ${themeToken['gray-10']};
            & > tr {
              background: ${themeToken['gray-10']};
              font-size: ${themeToken.fontSizeSM}px;
              & > th {
                color: ${themeToken['gray-7']};
                background: ${themeToken['gray-10']};
                text-align: center;
                &.ant-table-cell {
                  padding: ${themeToken.paddingXS}px;
                  background: ${themeToken['gray-10']};
                }
              }
            }
          }
        }
        & > .ant-table-body {
          .ant-table-tbody {
            min-height: 300px;
            background: ${themeToken['gray-10']};
            color: ${themeToken.colorWhite};
            & > tr {
              transition: background-color 0.3s;
              & > td {
                border: 0;
                padding: ${themeToken.paddingXXS}px;
                &:first-child {
                  padding-inline-start: ${themeToken.paddingMD}px;
                }
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
`;
