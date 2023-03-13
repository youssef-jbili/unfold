export interface PublicStore {
  gitRepoPath?: string;
  username: string;
}

export interface PrivateStore extends PublicStore {
  // Encrypted gitlab token
  gitlabToken?: string;
}
