import type { FC } from 'react';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { AppContextType } from './context';
import type { Issue } from '../../../types/entities';
import { Column } from '../../components/Column';
import { Header } from '../../components/Header';
import { IssueDetails } from '../../components/issue/IssueDetails';
import { AppContext } from './context';
import { COLUMNS, EPIC_NAME } from '../../constants';

export const Home: FC = () => {
  const { issueId } = useParams();
  const navigate = useNavigate();
  const [allIssues, setAllIssues] = useState<Issue[] | undefined>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [issuesByColumn, setIssuesByColumn] = useState<Record<string, Issue[]>>(
    {}
  );
  const [selectedIssue, setSelectedIssue] = useState<Issue | undefined>();
  const [highlightedIssues, setHighlightedIssues] = useState<Set<number>>(
    new Set()
  );

  const refresh = useCallback(async (): Promise<void> => {
    setIsRefreshing(true);
    try {
      const { issues } = await window.electron.issues.getAllIssuesFromGitlab({
        label: EPIC_NAME,
      });
      setAllIssues(issues);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!issueId) {
      setSelectedIssue(undefined);
      return;
    }
    setSelectedIssue(allIssues?.find(({ id }) => id === +issueId));
  }, [allIssues, setSelectedIssue, issueId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!allIssues) return;
    setIssuesByColumn(
      Object.fromEntries(
        COLUMNS.map((column) => [
          column,
          allIssues
            .filter(({ labels }) =>
              labels.map(({ name }) => name).includes(column)
            )
            .sort((a, b) => a.order - b.order),
        ])
      )
    );
  }, [allIssues, setIssuesByColumn]);

  const contextValue: AppContextType = useMemo(
    () => ({
      showDepGraph(value: string): void {
        // eslint-disable-next-line no-console
        console.log(`Coming soon: dep graph for "${value}"`);
      },
      selectedIssueIds: highlightedIssues,
      selectIssue: (selectedIssueId: number) => {
        setHighlightedIssues((issues) => new Set(issues).add(selectedIssueId));
      },
      deselectIssue: (selectedIssueId: number) => {
        setHighlightedIssues((issues) => {
          const newIssues = new Set(issues);
          newIssues.delete(selectedIssueId);
          return newIssues;
        });
      },
    }),
    [highlightedIssues]
  );

  if (!allIssues) {
    return <div>loading</div>;
  }

  return (
    <AppContext.Provider value={contextValue}>
      <div style={{ width: '100%' }}>
        <Header isRefreshing={isRefreshing} onRefresh={refresh} />
        <div
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: '100%',
            overflowX: 'scroll',
          }}
        >
          {COLUMNS.map((columnLabel) => (
            <Column
              key={columnLabel}
              label={columnLabel}
              issues={issuesByColumn[columnLabel] ?? []}
            />
          ))}
        </div>
      </div>
      <IssueDetails issue={selectedIssue} onClose={() => navigate('/')} />
    </AppContext.Provider>
  );
};
