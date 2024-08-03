import { StyledContent, StyledLayout } from '@lib/theme/components/Layout';
import CoinView from '@/features/coinView/views/CoinView';

function App() {
  return (
    <StyledLayout>
      <StyledContent>
        <CoinView />
      </StyledContent>
    </StyledLayout>
  );
}

export default App;
