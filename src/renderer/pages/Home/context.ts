import { createContext } from 'react';

export type AppContextType = {
  showDepGraph: (label: string) => void;
  selectedIssueIds: Set<number>;
  selectIssue: (issueId: number) => void;
  deselectIssue: (issueId: number) => void;
};

export const AppContext = createContext<AppContextType>({
  showDepGraph: () => {},
  selectedIssueIds: new Set(),
  selectIssue: () => {},
  deselectIssue: () => {},
});
