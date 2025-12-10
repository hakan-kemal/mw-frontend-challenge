/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useApi } from './api';

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

const locationPoint = {
  latitudeMax: 56,
  latitudeMin: 48,
  longitudeMax: 9,
  longitudeMin: 1,
};

describe('useApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns data when the request succeeds', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        jsonrpc: '2.0',
        id: 0,
        result: { message: 'ok' },
      }),
    });

    const { result } = renderHook(
      () =>
        useApi({
          method: 'getSomething',
          params: { filter: {}, locationPoint },
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({
      jsonrpc: '2.0',
      id: 0,
      result: { message: 'ok' },
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('throws an error on non OK status', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(
      () =>
        useApi({
          method: 'getSomething',
          params: { filter: {}, locationPoint },
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toMatch(/HTTP error/);
  });

  it('throws an error when API returns an error field', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        jsonrpc: '2.0',
        id: 0,
        error: { message: 'API failure' },
      }),
    });

    const { result } = renderHook(
      () =>
        useApi({
          method: 'getSomething',
          params: { filter: {}, locationPoint },
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toContain('API failure');
  });

  it('does not run query when method is falsy', () => {
    const { result } = renderHook(
      () =>
        useApi({
          method: '',
          params: { filter: {}, locationPoint },
        }),
      {
        wrapper,
      }
    );

    expect(result.current.isPending).toBe(true);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
