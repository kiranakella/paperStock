import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

interface GraphqlResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

@Injectable({ providedIn: 'root' })
export class GraphqlApiService {
  constructor(private http: HttpClient) {}

  post<T>(query: string, variables?: Record<string, unknown>): Observable<T> {
    return this.http
      .post<GraphqlResponse<T>>(environment.apiUrl, {
        query,
        variables,
      })
      .pipe(
        map((response) => {
          if (response.errors && response.errors.length > 0) {
            throw new Error(response.errors.map((error) => error.message).join(', '));
          }

          if (!response.data) {
            throw new Error('GraphQL response missing data');
          }

          return response.data;
        })
      );
  }
}
