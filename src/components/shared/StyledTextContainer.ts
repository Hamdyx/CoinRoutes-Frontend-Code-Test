import { Flex } from 'antd';
import styled from 'styled-components';

import themeToken from '@lib/theme/tokens';

export const StyledTextContainer = styled(Flex)`
  &.ant-flex {
    padding-block: 8px;
    padding-inline-start: 32px;
    background: ${themeToken['gray-10']};
    border-block: 1px solid ${themeToken['gray-7']};
    & > .ant-typography {
      color: ${themeToken['gray-7']};
    }
  }
`;
