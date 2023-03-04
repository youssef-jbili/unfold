import { HttpClient } from '../utils/httpClient';

export const gitlabApi = new HttpClient({
  baseUrl: 'https://git.legalplace.eu/api/v4',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
