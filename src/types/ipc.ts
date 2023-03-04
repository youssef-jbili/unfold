import type { UserInfo } from './entities';

export enum Channel {
  AddToken = 'add-token',
  CheckToken = 'check-token',
  GetUserInfo = 'get-user-info',
}

export interface CheckTokenMessage {
  token: string;
}

export interface CheckTokenResponse {
  userInfo?: UserInfo;
}

export interface AddTokenMessage {
  token: string;
}
