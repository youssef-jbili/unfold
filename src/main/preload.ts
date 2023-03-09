import { contextBridge } from 'electron';
import { Issue } from '../types/entities';
import {
  AddTokenMessage,
  Channel,
  CheckTokenMessage,
  CheckTokenResponse,
  EventType,
  GetGitlabIssuesMessage,
  HasTokenResponse,
  Unsubscriber,
} from '../types/ipc';
import { sendMessagePromise, subscribeToEvent } from './helpers/ipc';

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
    startFetchIssuesFromGitlab: (
      message: GetGitlabIssuesMessage
    ): Promise<void> => {
      return sendMessagePromise(Channel.StartFetchGitlabIssues, message);
    },
  },
  windows: {
    openSideWindow: (): Promise<void> => {
      return sendMessagePromise(Channel.OpenSideWindow);
    },
  },
  network: {
    getNetworkStatus: (): Promise<boolean> => {
      return sendMessagePromise(Channel.GetNetworkStatus);
    },
  },
  listeners: {
    onIssuesFetch: (handler: (issues: Issue[]) => void): Unsubscriber => {
      return subscribeToEvent(EventType.IssuesFetch, handler);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
