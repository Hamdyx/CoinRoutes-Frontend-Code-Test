import { QueryFunction, useQuery } from '@tanstack/react-query';

import axiosClient from '@/lib/axios';
import { Coin } from '@/types';

export const getCoins = async () => {
  const { data } = await axiosClient.get<Coin[]>('https://api.pro.coinbase.com/products');
  return data;
};
type QueryFnType = typeof getCoins;

interface UseGetCoinsOptions {
  config?: QueryFunction<QueryFnType>;
}

export const useGetCoins = ({ config }: UseGetCoinsOptions) => {
  return useQuery({
    queryKey: ['coins'],
    queryFn: () => getCoins(),
    ...config,
  });
};
