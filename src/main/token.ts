import { safeStorage } from 'electron';
import Store from 'electron-store';

const STORE_KEY = 'gitlab-automator-encrypted';
const STORE_TOKEN_KEY = 'gitlab-token';

const store = new Store<Record<string, string>>({
  name: STORE_KEY,
  watch: true,
});

export const getSavedToken = (): string | undefined => {
  if (!safeStorage.isEncryptionAvailable) {
    throw new Error('Cannot decrypt gitlab token');
  }
  const encryptedToken = store.store[STORE_TOKEN_KEY];
  if (!encryptedToken) {
    return undefined;
  }
  return safeStorage.decryptString(Buffer.from(encryptedToken, 'hex'));
};

export const setToken = (token: string): void => {
  if (!safeStorage.isEncryptionAvailable) {
    throw new Error('Cannot securely store gitlab token');
  }
  const encryptedTokenBuffer = safeStorage.encryptString(token);
  store.set(STORE_TOKEN_KEY, encryptedTokenBuffer.toString('hex'));
};
