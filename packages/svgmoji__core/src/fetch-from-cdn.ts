import 'isomorphic-fetch';

export interface FetchFromCDNOptions extends RequestInit {
  /**
   * The version of the emojibase library to fetch.
   *
   * @default 'latest'
   */
  version?: string;
}

async function get<Type>(key: string): Promise<Type | undefined> {
  if (typeof document === 'undefined') {
    return;
  }

  const { get: idbGet } = await import('idb-keyval');
  return idbGet(key);
}

async function set<Type>(key: string, value: Type): Promise<void> {
  if (typeof document === 'undefined') {
    return;
  }

  const { set: idbSet } = await import('idb-keyval');
  await idbSet(key, value);
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
  const cachedData: T | undefined = await get(cacheKey);

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
    await set(cacheKey, data);
  } catch {
    // Do nothing.
  }

  return data;
}
