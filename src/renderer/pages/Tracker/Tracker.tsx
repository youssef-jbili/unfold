import { useEffect, useState } from 'react';
import { Issue } from '../../../types/entities';
import { PublicStore } from '../../../types/store';
import { useIssues } from '../../hooks/issues';

const STATUS_TO_TRACK = [
  'workflow::doing',
  'workflow::merge',
  'workflow::push to staging',
  'workflow::need review',
  'workflow::failed review',
  'workflow::on hold',
  'workflow::push to prod',
] as const;

type TrackedStatus = typeof STATUS_TO_TRACK[number];

const STATUS_TO_TRACK_SET: Set<string> = new Set(STATUS_TO_TRACK);
type FilteredIssueSection = {
  status: TrackedStatus;
  issues: Issue[];
};

export const Tracker = () => {
  const [allIssues] = useIssues();
  const [filteredIssues, setFilteredIssues] = useState<FilteredIssueSection[]>(
    []
  );
  const [settings, setSettings] = useState<PublicStore | undefined>();

  useEffect(() => {
    (async () => {
      const publicSettings = await window.electron.settings.getSettings();
      setSettings(publicSettings);
    })();
  }, [setSettings]);

  useEffect(() => {
    if (!settings || allIssues.length === 0) {
      return;
    }
    const { username } = settings;
    const newFilteredIssues = Object.fromEntries(
      STATUS_TO_TRACK.map((status) => [status, []])
    ) as unknown as Record<TrackedStatus, Issue[]>;

    allIssues.forEach((issue) => {
      if (!issue.assignees.some(({ name }) => name === username)) {
        return;
      }
      const status = issue.labels.find((label) =>
        STATUS_TO_TRACK_SET.has(label.name)
      );

      if (!status) {
        return;
      }
      newFilteredIssues[status.name as TrackedStatus].push(issue);
    });

    setFilteredIssues(
      Object.entries(newFilteredIssues).map(
        ([status, issues]) =>
          ({
            status,
            issues,
          } as FilteredIssueSection)
      )
    );
  }, [settings, allIssues]);

  return (
    <div>
      {filteredIssues.map(({ status, issues }) => {
        if (issues.length === 0) {
          return null;
        }
        return (
          <>
            <h1>{status}</h1>
            {issues.map(({ title }) => (
              <div>{title}</div>
            ))}
          </>
        );
      })}
    </div>
  );
};
