import { InputNumber } from 'antd';
import styled from 'styled-components';

import themeToken from '../tokens';

const defaultTheme = {};

export const inputNumberTheme = {
  ...defaultTheme,
};

export const StyledInputNumber = styled(InputNumber)`
  &.ant-input-number {
    background: ${themeToken['gray-10']};
    border-color: ${themeToken['gray-8']};
    &:hover {
      border-color: ${themeToken['gray-7']};
    }
    & > .ant-input-number-handler-wrap {
      background: ${themeToken['gray-10']};
      & > .ant-input-number-handler {
        & > .anticon {
          color: ${themeToken['gray-7']};
        }
      }
    }
    & > .ant-input-number-input-wrap {
      input {
        color: ${themeToken['gray-7']};
      }
    }
  }
`;
