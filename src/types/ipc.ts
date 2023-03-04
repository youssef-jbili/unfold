export type Channel = 'add-token' | 'get-user-info' | 'ipc-example';

export interface AddTokenMessage {
  token: string;
}
