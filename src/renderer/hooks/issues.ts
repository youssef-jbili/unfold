import { useCallback, useEffect, useState } from 'react';
import { Issue } from '../../types/entities';
import { EPIC_NAME } from '../constants';
import { getStoredIssues } from '../services/db';

export const useIssues = (): [Issue[], () => Promise<void>] => {
  const [allIssues, setAllIssues] = useState<Issue[]>([]);

  useEffect(() => {
    return window.electron.listeners.onIssuesFetch((issues) => {
      setAllIssues(issues);
    });
  }, [setAllIssues]);

  useEffect(() => {
    const loadCachedIssues = async () => {
      const savedIssues = await getStoredIssues();
      setAllIssues(savedIssues);
    };
    loadCachedIssues();
  }, []);

  const refresh = useCallback(async () => {
    return window.electron.issues.startFetchIssuesFromGitlab({
      label: EPIC_NAME,
    });
  }, []);

  return [allIssues, refresh];
};
