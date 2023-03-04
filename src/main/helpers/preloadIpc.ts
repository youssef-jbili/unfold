import { ipcRenderer, IpcRendererEvent } from 'electron';
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
      (_event: IpcRendererEvent, exitCode: number, returnedData: T) => {
        if (exitCode !== 0) {
          reject(returnedData);
        }

        resolve(returnedData);
      }
    );

    ipcRenderer.send(channel, uniqueChannel, message);
  });
