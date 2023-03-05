import { ipcMain, ipcRenderer } from 'electron';
import { v4 } from 'uuid-browser';
import { Channel } from '../../types/ipc';

export const sendMessagePromise = <T>(
  channel: Channel,
  message: unknown
): Promise<T> =>
  new Promise((resolve, reject) => {
    const uniqueChannel = `${channel};${v4()}`;

    ipcRenderer.once(
      uniqueChannel,
      (_event, success: boolean, returnedData: T) => {
        if (!success) {
          reject(returnedData);
        }

        resolve(returnedData);
      }
    );

    ipcRenderer.send(channel, uniqueChannel, message);
  });

export const handleMessage = <T, U>(
  channel: Channel,
  handler: (message: U) => T | Promise<T>
) => {
  ipcMain.on(channel, async (event, returnChannel: string, message: U) => {
    try {
      const result = await handler(message);
      event.sender.send(returnChannel, true, result);
    } catch (err: unknown) {
      event.sender.send(returnChannel, false, err);
    }
  });
};