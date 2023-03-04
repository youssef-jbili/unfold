import { contextBridge } from 'electron';
import { Channel, CheckTokenMessage, CheckTokenResponse } from '../types/ipc';
import { sendMessagePromise } from './helpers/preloadIpc';

const electronHandler = {
  ipcRenderer: {
    checkToken: async (
      message: CheckTokenMessage
    ): Promise<CheckTokenResponse> => {
      return sendMessagePromise(Channel.CheckToken, message);
    },
  },
};

console.log('HEEEERssE');
contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
