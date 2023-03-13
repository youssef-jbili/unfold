import { safeStorage } from 'electron';
import Store from 'electron-store';
import { PrivateStore, PublicStore } from '../../types/store';

const STORE_KEY = 'gitlab-automator';
const STORE_TOKEN_KEY: keyof PrivateStore = 'gitlabToken';
const STORE_USERNAME_KEY: keyof PrivateStore = 'username';

const store = new Store<PrivateStore>({
  name: STORE_KEY,
  watch: true,
});

export const getSavedToken = (): string | undefined => {
  if (!safeStorage.isEncryptionAvailable) {
    throw new Error('Cannot decrypt gitlab token');
  }
  const encryptedToken = store.store.gitlabToken;
  if (!encryptedToken) {
    return undefined;
  }
  return safeStorage.decryptString(Buffer.from(encryptedToken, 'hex'));
};

export const setToken = (token: string, username: string): void => {
  if (!safeStorage.isEncryptionAvailable) {
    throw new Error('Cannot securely store gitlab token');
  }
  const encryptedTokenBuffer = safeStorage.encryptString(token);
  store.set(STORE_TOKEN_KEY, encryptedTokenBuffer.toString('hex'));
  store.set(STORE_USERNAME_KEY, username);
};

export const getPublicSettings = (): PublicStore => ({
  username: store.store.username,
  gitRepoPath: store.store.gitRepoPath,
});
