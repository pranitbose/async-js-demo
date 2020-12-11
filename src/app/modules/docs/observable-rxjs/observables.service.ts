import { Injectable } from '@angular/core';
import { ConnectableObservable, interval, Observable, of } from 'rxjs';
import { catchError, concatMap, delay, flatMap, map, publish, share, skip, take, tap, timeout } from 'rxjs/operators';

@Injectable()
export class ObservablesService {

  constructor() { }

  /** Cold Observable */
  coldObservableSource(): Observable<number> {
    return interval(1000) // Infinite observable source stream emitting sequence of values at 1 second interval
      .pipe(
        take(6) // Take first 6 values before completing
      );
  }

  /** Hot Observable */
  hotObservableSource(): ConnectableObservable<number> {
    // Converting a Cold Observable into a Hot Observable
    const source$ = this.coldObservableSource()
      .pipe(
        publish() // Shares source and make it hot by calling connect()
      ) as ConnectableObservable<number>;
    return source$;
  }

  /** Lazy loaded Hot Observable */
  lazyLoadedHotObservableSource(): Observable<number> {
    // Converting a Cold Observable into a lazy loaded Hot Observable
    return this.coldObservableSource()
      .pipe(
        share() // Shares source among multiple subscribers. Internally using publish() + refCount() to ensure that source is emitting in live (stream) mode but only once someone subscribes for first time
      );
  }

  mapSource(): Observable<Array<number>> {
    return this.coldObservableSource()
      .pipe(
        skip(1),
        map(val => [val * 1, val * 2, val * 3])
      );
  }

  flatMapSource(): Observable<number> {
    return this.coldObservableSource()
      .pipe(
        skip(1),
        flatMap(val => [val * 1, val * 2, val * 3])
      );
  }

  timeoutExampleSource(): Observable<any> {
    return of(1000, 4000, 3000, 2000)
      .pipe(
        concatMap(duration =>
          this.makeRequest(duration).pipe(
            timeout(2500), // Timeout after 2.5 seconds
            catchError(error => of(`Request timed out after: ${duration}`)) // Handle error (Timeout Error)
          )
        )
      );
  }

  // simulate request
  private makeRequest(timeToDelay): Observable<string> {
    return of('Request Complete!').pipe(delay(timeToDelay));
  }
}
