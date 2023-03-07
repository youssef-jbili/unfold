import { mapGitlabIssueToIssue } from './mappers/issue.mapper';
import {
  AddTokenMessage,
  Channel,
  CheckTokenMessage,
  CheckTokenResponse,
  GetGitlabIssuesMessage,
  GetGitlabIssuesResponse,
  HasTokenResponse,
} from '../types/ipc';
import { getUserInfoForToken } from './apiServices/gitlab.service';
import { getAllIssuesFromGitlab } from './apiServices/issues.service';
import { handleMessage } from './helpers/ipc';
import { getSavedToken, setToken } from './utils/token';

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
      setToken(token);
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
    Channel.GetGitlabIssues,
    async ({
      label,
    }: GetGitlabIssuesMessage): Promise<GetGitlabIssuesResponse> => {
      const issues = await getAllIssuesFromGitlab(label);
      return { issues: mapGitlabIssueToIssue(issues) };
    }
  );

  // Window management

  handleMessage(Channel.OpenSideWindow, async (): Promise<void> => {});
};
