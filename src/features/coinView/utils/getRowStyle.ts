import themeToken from '@lib/theme/tokens';

export const getRowStyle = (key: string, type: 'bids' | 'asks') => {
  const [, percentage] = key.split('-');
  return `linear-gradient(to right, ${
    type === 'bids' ? themeToken['green-9'] : themeToken['red-9']
  } ${percentage}%, transparent ${percentage}%)`;
};
