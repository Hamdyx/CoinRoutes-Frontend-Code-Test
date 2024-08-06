import { Select } from 'antd';
import styled from 'styled-components';

const defaultTheme = {};

export const selectTheme = {
  ...defaultTheme,
};

export const StyledSelect = styled(Select)`
  &.ant-select {
    width: 150px;
  }
`;
