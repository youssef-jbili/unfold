export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
  PATCH = 'PATCH',
}

export type HttpResponseType = 'json' | 'plain' | 'blob';

export interface HttpRequestOptions {
  headers?: Record<string, string>;
  responseType?: HttpResponseType;
  formEncoded?: boolean;
  timeout?: number;
}

export interface HttpRequestErrorDetails {
  statusCode?: number;
  message?: string;
}

export interface HttpResponse<T> {
  statusCode: number;
  statusText: string;
  headers: Record<string, string | string[]>;
  data: T;
}

export class HttpRequestError extends Error {
  constructor(message: string, public details?: HttpRequestErrorDetails) {
    super(message);
    this.name = 'HttpRequestError';
  }
}
