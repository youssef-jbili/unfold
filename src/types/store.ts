export interface PublicStore {
  gitRepoPath?: string;
}

export interface PrivateStore extends PublicStore {
  // Encrypted gitlab token
  gitlabToken?: string;
}
