import { net, webContents } from 'electron';
import { mapGitlabIssueToIssue } from './mappers/issue.mapper';
import {
  AddTokenMessage,
  Channel,
  CheckTokenMessage,
  CheckTokenResponse,
  EventType,
  GetGitlabIssuesMessage,
  GetSettingsResponse,
  HasTokenResponse,
} from '../types/ipc';
import { getUserInfoForToken } from './apiServices/gitlab.service';
import { getAllIssuesFromGitlab } from './apiServices/issues.service';
import { handleMessage } from './helpers/ipc';
import { getPublicSettings, getSavedToken, setToken } from './utils/store';
import { WINDOW_MANAGER } from './helpers/windows';

export const setupMainIpcHandler = () => {
  // Tokens
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
      setToken(token, userInfo.name);
    }
  );

  handleMessage(
    Channel.HasToken,
    (): HasTokenResponse => ({
      hasToken: getSavedToken() !== undefined,
    })
  );

  // Issues

  handleMessage(
    Channel.StartFetchGitlabIssues,
    async ({ label }: GetGitlabIssuesMessage): Promise<void> => {
      const issues = mapGitlabIssueToIssue(await getAllIssuesFromGitlab(label));
      webContents.getAllWebContents().forEach((wc) => {
        wc.send(EventType.IssuesFetch, issues);
      });
    }
  );

  // Window management

  handleMessage(Channel.OpenSideWindow, async (): Promise<void> => {
    WINDOW_MANAGER.getStickyWindow();
  });

  // Network

  handleMessage(Channel.GetNetworkStatus, () => {
    return net.isOnline();
  });

  handleMessage(Channel.GetSettings, (): GetSettingsResponse => {
    return getPublicSettings();
  });
};
