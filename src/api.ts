import { useQuery } from '@tanstack/react-query';
import type { ApiRequestBody } from './types';

const API_URL = 'https://php-api.mywheels.dev/api/';

export const useApi = ({
  method,
  params,
}: Omit<ApiRequestBody, 'jsonrpc' | 'id'>) => {
  return useQuery({
    queryKey: ['resourceData', method, params],
    queryFn: async () => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'X-Simple-Auth-App-Id':
            '1_4ufl98675y8088ko4k80wow4soo0g8cog8kwsssoo4k4ggc84k',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 0,
          method,
          params,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'API error');
      }

      return data;
    },
    enabled: Boolean(method),
  });
};
