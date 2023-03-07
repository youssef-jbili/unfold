import { contextBridge } from 'electron';
import {
  AddTokenMessage,
  Channel,
  CheckTokenMessage,
  CheckTokenResponse,
  GetGitlabIssuesMessage,
  GetGitlabIssuesResponse,
  HasTokenResponse,
} from '../types/ipc';
import { sendMessagePromise } from './helpers/ipc';

const electronHandler = {
  tokens: {
    checkToken: async (
      message: CheckTokenMessage
    ): Promise<CheckTokenResponse> => {
      return sendMessagePromise(Channel.CheckToken, message);
    },

    saveToken: async (message: AddTokenMessage): Promise<void> => {
      return sendMessagePromise(Channel.AddToken, message);
    },

    hasToken: async (): Promise<HasTokenResponse> => {
      return sendMessagePromise(Channel.HasToken);
    },
  },
  issues: {
    getAllIssuesFromGitlab: async (
      message: GetGitlabIssuesMessage
    ): Promise<GetGitlabIssuesResponse> => {
      return sendMessagePromise(Channel.GetGitlabIssues, message);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
