import { contextBridge } from 'electron';
import {
  AddTokenMessage,
  Channel,
  CheckTokenMessage,
  CheckTokenResponse,
} from '../types/ipc';
import { sendMessagePromise } from './helpers/ipc';

const electronHandler = {
  ipcRenderer: {
    checkToken: async (
      message: CheckTokenMessage
    ): Promise<CheckTokenResponse> => {
      return sendMessagePromise(Channel.CheckToken, message);
    },
    saveToken: async (message: AddTokenMessage): Promise<void> => {
      return sendMessagePromise(Channel.AddToken, message);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
