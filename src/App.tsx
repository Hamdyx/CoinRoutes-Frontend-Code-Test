import { StyledContent, StyledLayout } from '@lib/theme/components/Layout';
import CoinView from '@/features/coinView/views/CoinView';

import WebSocketComponent from './services/Websocket';

function App() {
  return (
    <StyledLayout>
      <StyledContent>
        <CoinView />
      </StyledContent>
      <WebSocketComponent />
    </StyledLayout>
  );
}

export default App;
