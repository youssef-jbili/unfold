import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { AddTokenMessage, Channel } from '../types/ipc';

const sendMessage = (channel: Channel, args: unknown[]) => {
  ipcRenderer.send(channel, args);
};

const messageOn = (channel: Channel, func: (...args: unknown[]) => void) => {
  const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
    func(...args);
  ipcRenderer.on(channel, subscription);

  return () => {
    ipcRenderer.removeListener(channel, subscription);
  };
};

const messageOnce = (channel: Channel, func: (...args: unknown[]) => void) => {
  ipcRenderer.once(channel, (_event, ...args) => func(...args));
};

const electronHandler = {
  ipcRenderer: {
    addToken(message: AddTokenMessage) {
      sendMessage('add-token', [message]);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
