import { net } from 'electron';
import type { HttpRequestOptions, HttpResponse } from '../../types/httpClient';
import { HttpMethod, HttpRequestError } from '../../types/httpClient';

export interface HttpClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
  dynamicHeaders?: () => Promise<Record<string, string>>;
  timeout?: number;
}

export class HttpClient {
  constructor(private options: HttpClientOptions) {
    if (!options.timeout) {
      this.options.timeout = 30000;
    }
  }

  async request<T = unknown>(
    method: HttpMethod,
    url: string,
    payload?: unknown,
    requestOptions?: HttpRequestOptions
  ): Promise<HttpResponse<T>> {
    const fullUrl = this.options.baseUrl
      ? new URL(url, this.options.baseUrl)
      : url;

    let body: string | undefined;
    if (payload) {
      if (requestOptions?.formEncoded) {
        body = new URLSearchParams(
          payload as Record<string, string>
        ).toString();
      } else {
        body = JSON.stringify(payload);
      }
    }

    const dynamicHeaders = this.options.dynamicHeaders
      ? await this.options.dynamicHeaders()
      : undefined;

    const headers = {
      ...dynamicHeaders,
      ...this.options.headers,
      ...requestOptions?.headers,
    };

    const httpResponse = await new Promise<HttpResponse<string>>(
      (resolve, reject) => {
        const request = net.request({
          url: fullUrl.toString(),
          method: method.toString(),
        });
        if (headers) {
          Object.entries(headers).forEach(([key, value]) => {
            request.setHeader(key, value);
          });
        }

        let responseBuffer = Buffer.alloc(0);

        request
          .on('response', (response) => {
            response
              .on('end', () => {
                resolve({
                  statusCode: response.statusCode,
                  statusText: response.statusMessage,
                  data: responseBuffer.toString('utf-8'),
                  headers: response.headers,
                });
              })
              .on('data', (data) => {
                const newBuffer = Buffer.allocUnsafe(
                  responseBuffer.length + data.length
                );
                responseBuffer.copy(newBuffer);
                data.copy(newBuffer, responseBuffer.length);
                responseBuffer = newBuffer;
              })
              .on('error', () => {
                reject(
                  new HttpRequestError('Network Error', {
                    statusCode: 0,
                    message: 'Network Error',
                  })
                );
              })
              .on('aborted', () => {
                reject(
                  new HttpRequestError('Request aborted', {
                    statusCode: 0,
                    message: 'Request aborted',
                  })
                );
              });
          })
          .on('error', (error) =>
            reject(
              new HttpRequestError(`Network Error : ${error.message}`, {
                statusCode: 0,
                message: error.message,
              })
            )
          )
          .end(body, 'utf8');
        setTimeout(() => {
          reject(
            new HttpRequestError('Request timed out', {
              statusCode: 0,
              message: 'Request timed out',
            })
          );
        }, requestOptions?.timeout ?? this.options.timeout);
      }
    );

    if (httpResponse.statusCode < 200 || httpResponse.statusCode > 299) {
      throw new HttpRequestError(
        `Request failed with status ${httpResponse.statusCode}`,
        {
          statusCode: httpResponse.statusCode,
          message: httpResponse.data,
        }
      );
    }

    if (
      !requestOptions?.responseType ||
      requestOptions.responseType === 'json'
    ) {
      return {
        ...httpResponse,
        data: httpResponse.data ? JSON.parse(httpResponse.data) : {},
      };
    }
    if (requestOptions.responseType === 'plain') {
      return httpResponse as HttpResponse<T>;
    }
    if (requestOptions.responseType === 'blob') {
      throw new Error('Blob not implemented');
    }
    throw new Error(`unsupported responseType ${requestOptions.responseType}`);
  }

  async get<T = unknown>(
    url: string,
    requestOptions?: HttpRequestOptions
  ): Promise<HttpResponse<T>> {
    return this.request<T>(HttpMethod.GET, url, undefined, requestOptions);
  }

  async post<T = unknown>(
    url: string,
    payload?: unknown,
    requestOptions?: HttpRequestOptions
  ): Promise<HttpResponse<T>> {
    return this.request<T>(HttpMethod.POST, url, payload, requestOptions);
  }

  async patch<T = unknown>(
    url: string,
    payload?: unknown,
    requestOptions?: HttpRequestOptions
  ): Promise<HttpResponse<T>> {
    return this.request<T>(HttpMethod.PATCH, url, payload, requestOptions);
  }

  async put<T = unknown>(
    url: string,
    payload?: unknown,
    requestOptions?: HttpRequestOptions
  ): Promise<HttpResponse<T>> {
    return this.request<T>(HttpMethod.PUT, url, payload, requestOptions);
  }

  async delete<T = unknown>(
    url: string,
    payload?: unknown,
    requestOptions?: HttpRequestOptions
  ): Promise<HttpResponse<T>> {
    return this.request<T>(HttpMethod.DELETE, url, payload, requestOptions);
  }
}
