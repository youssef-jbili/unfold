import { ipcMain } from 'electron';
import { AddTokenMessage, Channel, CheckTokenMessage } from '../types/ipc';
import { getUserInfoForToken } from './apiServices/gitlab.service';
import { setToken } from './token';

export const setupMainIpcHandler = () => {
  ipcMain.on(
    Channel.CheckToken,
    async (event, returnChannel: string, { token }: CheckTokenMessage) => {
      const userInfo = await getUserInfoForToken(token);
      event.sender.send(returnChannel, true, { userInfo });
    }
  );

  ipcMain.on(
    Channel.AddToken,
    async (event, returnChannel: string, { token }: AddTokenMessage) => {
      const userInfo = await getUserInfoForToken(token);
      if (!userInfo) {
        event.sender.send(returnChannel, false, new Error('invalid token'));
        return;
      }
      setToken(token);
      event.sender.send(returnChannel, true);
    }
  );
};
