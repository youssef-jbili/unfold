import {
  AddTokenMessage,
  Channel,
  CheckTokenMessage,
  CheckTokenResponse,
} from '../types/ipc';
import { getUserInfoForToken } from './apiServices/gitlab.service';
import { handleMessage } from './helpers/ipc';
import { setToken } from './token';

export const setupMainIpcHandler = () => {
  handleMessage(
    Channel.CheckToken,
    async ({ token }: CheckTokenMessage): Promise<CheckTokenResponse> => {
      const userInfo = await getUserInfoForToken(token);
      return { userInfo };
    }
  );

  handleMessage(
    Channel.AddToken,
    async ({ token }: AddTokenMessage): Promise<void> => {
      const userInfo = await getUserInfoForToken(token);
      if (!userInfo) {
        throw new Error('invalid token');
      }
      setToken(token);
    }
  );
};
