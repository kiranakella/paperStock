import { ApiResponse } from '../models/api-response.model';

export function unwrapApiResponse<T>(response: ApiResponse<T> | T): T {
  if (response && typeof response === 'object' && 'data' in response) {
    const wrapped = response as ApiResponse<T>;
    if (wrapped.data !== undefined) {
      return wrapped.data;
    }
  }

  return response as T;
}
