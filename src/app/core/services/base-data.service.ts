import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, defer, of, throwError } from 'rxjs';
import { catchError, delay, finalize, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { unwrapApiResponse } from '../adapters/api-response.adapter';

@Injectable()
export abstract class BaseDataService {
  protected useMock = environment.USE_MOCK !== false;
  protected readonly mockDelayMs = 250;

  protected readonly loadingSubject = new BehaviorSubject<boolean>(false);
  protected readonly errorSubject = new BehaviorSubject<string | null>(null);

  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  protected request<T, R = T>(config: {
    mockFactory: () => R;
    apiFactory: () => Observable<ApiResponse<R> | R>;
    mapper?: (value: R) => T;
    errorMessage?: string;
  }): Observable<T> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    const resolve = (value: R): T => {
      if (config.mapper) {
        return config.mapper(value);
      }

      return value as unknown as T;
    };

    const source = this.useMock
      ? defer(() => of(config.mockFactory())).pipe(delay(this.mockDelayMs))
      : config.apiFactory().pipe(map((response) => unwrapApiResponse(response)));

    return source.pipe(
      map(resolve),
      catchError((error) => {
        const message = this.extractErrorMessage(error, config.errorMessage || 'Request failed');
        this.errorSubject.next(message);
        console.error(message, error);
        return throwError(() => new Error(message));
      }),
      finalize(() => this.loadingSubject.next(false))
    );
  }

  protected extractErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error) {
      return error.message || fallback;
    }

    if (error && typeof error === 'object' && 'message' in error) {
      const message = (error as { message?: string }).message;
      return message || fallback;
    }

    return fallback;
  }
}
