import themeToken from '@lib/theme/tokens';

export const getRowStyle = (percentage: number, type: 'bids' | 'asks') => {
  return `linear-gradient(to right, ${
    type === 'bids' ? themeToken['green-9'] : themeToken['red-9']
  } ${percentage}%, transparent ${percentage}%)`;
};
