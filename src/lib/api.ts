import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { RequestBody, ResponseBody } from '../types';

const API_URL = '/api';

export const useApi = <TResult = ResponseBody>({
  method,
  params,
}: Omit<RequestBody, 'jsonrpc' | 'id'>) =>
  useQuery<TResult>({
    queryKey: ['resourceData', method, JSON.stringify(params ?? {})],
    queryFn: async ({ signal }) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 0,
          method,
          params,
        }),
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = (await response.json()) as TResult & {
        error?: { message?: string };
      };

      if ((data as { error?: { message?: string } }).error) {
        throw new Error(
          (data as { error?: { message?: string } }).error?.message ||
            'API error'
        );
      }

      return data;
    },
    enabled: Boolean(method),
    staleTime: 30_000,
    gcTime: 300_000,
    placeholderData: keepPreviousData,
  });
