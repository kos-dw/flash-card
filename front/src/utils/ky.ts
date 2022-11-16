import type { Options } from 'ky';
import ky from 'ky';

export const DEFAULT_KY_OPTIONS: Options = {
  prefixUrl: import.meta.env.VITE_API_ENDPOINT,
  timeout: 4000,
  retry: 1,
};

export const kyClient = ky.create(DEFAULT_KY_OPTIONS);
interface kyError {
  name: string;
  response: {
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
  };
}

export const isKyError = (error: unknown): error is kyError => {
  const E = error as kyError;

  return (
    typeof E?.name === 'string' &&
    typeof E?.response.ok === 'boolean' &&
    typeof E?.response.redirected === 'boolean' &&
    typeof E?.response.status === 'number' &&
    typeof E?.response.statusText === 'string' &&
    typeof E?.response.type === 'string' &&
    typeof E?.response.url === 'string'
  );
};
