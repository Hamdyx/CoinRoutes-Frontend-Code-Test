import styled from 'styled-components';
import { Card } from 'antd';

import themeToken from '@lib/theme/tokens';

interface StyledCardProps {
  background?: 'green' | 'red';
  variant?: 'primary' | 'secondary';
}

const getBackgroundColor = (props: StyledCardProps) => {
  if (props.variant) {
    if (props.variant === 'secondary') return themeToken['gray-9'];
    if (props.background) return themeToken[props.background];
  }
  return 'initial';
};

const getBorderColor = (props: StyledCardProps) => {
  if (props.variant === 'secondary') return themeToken['gray-8'];
  return 'initial';
};

const StyledCard = styled(Card)<StyledCardProps>`
  &.ant-card {
    width: 400px;
    min-height: ${(props) => (props.variant === 'secondary' ? '840px' : 'auto')};
    background-color: ${(props) => getBackgroundColor(props)};
    border-color: ${(props) => getBorderColor(props)};
    @media (max-width: ${themeToken.screenMD}px) {
      width: 100%;
    }

    & > .ant-card-head {
      text-align: start;
      background-color: ${(props) => (props.background ? themeToken[props.background] : 'initial')};
      color: white;
    }
  }
`;

export default StyledCard;
