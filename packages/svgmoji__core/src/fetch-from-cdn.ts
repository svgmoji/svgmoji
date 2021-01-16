import { get, set } from 'idb-keyval';

export interface FetchFromCDNOptions extends RequestInit {
  /**
   * The version of the emojibase library to fetch.
   *
   * @default 'latest'
   */
  version?: string;
}

async function runInBrowser<Type, Callback extends (...args: any[]) => Promise<Type | undefined>>(
  callback: Callback,
  ...args: Parameters<Callback>
): Promise<Type | undefined> {
  if (typeof document === 'undefined') {
    return;
  }

  return callback(...args);
}

export async function fetchFromCDN<T>(path: string, options: FetchFromCDNOptions = {}): Promise<T> {
  const { version = 'latest', ...opts } = options;

  if (process.env.NODE_ENV === 'dev') {
    if (!path || path.slice(-5) !== '.json') {
      throw new Error('A valid JSON dataset is required to fetch.');
    }

    if (!version) {
      throw new Error('A valid release version is required.');
    }
  }

  const cacheKey = `svgmoji/${version}/${path}`;
  const cachedData: T | undefined = await runInBrowser(get, cacheKey);

  // Check the cache first
  if (cachedData) {
    return Promise.resolve(cachedData);
  }

  const response = await fetch(`https://cdn.jsdelivr.net/npm/emojibase-data@${version}/${path}`, {
    credentials: 'omit',
    mode: 'cors',
    redirect: 'error',
    ...opts,
  });

  if (!response.ok) {
    throw new Error('Failed to load Emojibase dataset.');
  }

  const data = await response.json();

  try {
    await runInBrowser(set, cacheKey, data);
  } catch {
    // Do nothing.
  }

  return data;
}
