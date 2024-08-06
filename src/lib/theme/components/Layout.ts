import { Layout } from 'antd';
import styled from 'styled-components';

import themeToken from '../tokens';

const { Content } = Layout;

const defaultTheme = {};

export const layoutTheme = {
  ...defaultTheme,
};

export const StyledLayout = styled(Layout)`
  &.ant-layout {
    height: 100%;
    flex-direction: column;
    padding-block: ${themeToken.paddingLG}px;
  }
`;

export const StyledContent = styled(Content)`
  &.ant-layout-content {
    padding-inline: ${themeToken.paddingLG}px;
    margin-inline: auto;
    width: 100%;
  }
`;
