import type { UserInfo } from '../../types/entities';
import { HttpRequestError } from '../../types/httpClient';
import { gitlabApi } from './api';

export const getPaginatedItemsFromGitlab = async <T>(
  relativePath: string,
  pagination: { page: number; perPage: number },
  options: Record<string, string> = {}
): Promise<T[]> => {
  const queryParams = new URLSearchParams({
    page: String(pagination.page),
    per_page: String(pagination.perPage),
    ...options,
  });

  const { data } = await gitlabApi.get<T[]>(
    `${relativePath}?${queryParams.toString()}`
  );

  return data;
};

export const getAllItemsFromGitlab = async <T>(
  relativePath: string,
  options: Record<string, string> = {}
): Promise<T[]> => {
  let allItems = await getPaginatedItemsFromGitlab<T>(
    relativePath,
    { page: 1, perPage: 100 },
    options
  );
  let index = 2;
  let currentFetchResult = await getPaginatedItemsFromGitlab<T>(
    relativePath,
    { page: 2, perPage: 100 },
    options
  );
  while (currentFetchResult.length > 0) {
    allItems = [...allItems, ...currentFetchResult];
    if (currentFetchResult.length < 100) {
      break;
    }
    index++;
    // eslint-disable-next-line no-await-in-loop
    currentFetchResult = await getPaginatedItemsFromGitlab<T>(
      relativePath,
      { page: index, perPage: 100 },
      options
    );
  }
  return allItems;
};

export const getUserInfoForToken = async (
  token: string
): Promise<UserInfo | null> => {
  try {
    const { data: userInfo } = await gitlabApi.get<{
      name: string;
      avatar_url: string;
    }>('user', {
      headers: {
        'PRIVATE-TOKEN': token,
      },
    });
    return {
      name: userInfo.name,
      avatarUrl: userInfo.avatar_url,
    };
  } catch (error: unknown) {
    if (
      error instanceof HttpRequestError &&
      error.details?.statusCode === 401
    ) {
      return null;
    }
    throw error;
  }
};
