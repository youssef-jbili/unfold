import { ipcMain, Notification } from 'electron';
import { Channel } from '../types/ipc';

export const setupMainIpcHandler = () => {
  ipcMain.on(Channel.CheckToken, () => {
    new Notification({
      title: 'Hellooo',
      body: "I'm loaded",
    }).show();
  });
};
