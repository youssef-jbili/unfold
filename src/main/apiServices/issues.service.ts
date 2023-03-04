import type { GitlabIssue } from '../../types/GitlabIssue';
import { getAllItemsFromGitlab } from './gitlab.service';

export const getAllIssuesFromGitlab = async (
  labels: string
): Promise<GitlabIssue[]> =>
  getAllItemsFromGitlab('issues', {
    scope: 'all',
    state: 'opened',
    labels,
    with_labels_details: 'true',
    order_by: 'relative_position',
    sort: 'asc',
  });
