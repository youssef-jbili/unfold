import { IDBPDatabase, openDB } from 'idb';
import { Issue } from '../../types/entities';

const DB_NAME = 'gitlab_automator';
const ISSUE_STORE = 'issue';

const getDB = (): Promise<IDBPDatabase> => {
  return openDB(DB_NAME, 1, {
    upgrade(database, oldVersion) {
      if (oldVersion < 1) {
        database.createObjectStore(ISSUE_STORE, { keyPath: 'id' });
      }
    },
  });
};

export const getStoredIssues = async (): Promise<Issue[]> => {
  const db = await getDB();

  return db.getAll(ISSUE_STORE);
};

export const saveIssues = async (issues: Issue[]): Promise<void> => {
  const db = await getDB();

  await db.clear(ISSUE_STORE);

  const transaction = db.transaction(ISSUE_STORE, 'readwrite');

  await Promise.all([
    ...issues.map((issue) => {
      return transaction.store.add(issue);
    }),
    transaction.done,
  ]);
};
