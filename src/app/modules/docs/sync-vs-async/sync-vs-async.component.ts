import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Observable, of, Subscription, throwError } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-sync-vs-async',
  templateUrl: './sync-vs-async.component.html',
  styleUrls: ['./sync-vs-async.component.scss']
})
export class SyncVsAsyncComponent implements OnInit, OnDestroy {

  private wishesSubscription: Subscription;

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void { 
    this.wishesSubscription && this.wishesSubscription.unsubscribe();
  }

  performSyncTasksV1(): void {
    const birthdayWish = this.waitForBirthdayWishSync(5000);
    console.log('Synchronous', birthdayWish);
    console.log('I waited for the Birthday Wish 😊');
  }

  waitForBirthdayWishSync(timeInMillis: number): string {
    const start = Date.now();
    while (Date.now() - start <= timeInMillis) { }

    return 'Happy Birthday 🎂';
  }

  performAsyncTasksV1(): void {
    this.waitForBirthdayWishAsync(5000)
      .then((wish: string) => { // Promise is fulfilled
        console.log('Asynchronous', wish);
      })
      .catch((err: any) => { // Promise is rejected
        console.log(`Cannot make Birthday wish 😭 : ${err}`);
      })
      .finally(() => {
        console.log('Done wishing for the Birthday! ✅');
      });
    console.log('I did not wait for the Birthday Wish 😢');
  }

  waitForBirthdayWishAsync(timeInMillis: number): Promise<string> {
    return new Promise((resolve, reject) => {
      if (Number.isNaN(timeInMillis) || !Number.isFinite(timeInMillis) || !Number.isInteger(timeInMillis)) {
        reject('Time in milliseconds is not a valid number');
        return;
      }
      setTimeout(() => {
        resolve('Happy Birthday 🎂');
      }, timeInMillis)
    });
  }

  performSyncTasksV2(): void {
    const iter = waitForBirthdayWishesSync(5000);
    let wishCount = iter.next();
    while (!wishCount.done) {
      console.log(`Synchronous Happy Birthday 🎂 from Person ${wishCount.value}`);
      wishCount = iter.next();
    }
    console.log('I waited for all the Birthday Wishes 😊');
  }

  performAsyncTasksV2(): void {
    this.wishesSubscription = this.waitForBirthdayWishesAsync(5000)
      .subscribe((wishCount: number) => {
        console.log(`Asynchronous Happy Birthday 🎂 from Person ${wishCount}`);
      }, (err: any) => {
        console.log(`Cannot make Birthday wishes 😭 : ${err}`);
      }, () => {
        console.log('Everybody has wished for the Birthday! ✅');
      });
    console.log('I did not wait for the Birthday Wish 😢');
  }

  waitForBirthdayWishesAsync(timeInMillis: number): Observable<number> {
    // return new Observable((observer) => {
    //   if (Number.isNaN(timeInMillis) || !Number.isFinite(timeInMillis) || !Number.isInteger(timeInMillis)) {
    //     observer.error('Time in milliseconds is not a valid number');
    //     return;
    //   }
    //   const list = [];
    //   for (let i = 1; i <= timeInMillis / 1000; i++) { list.push(i); }

    //   let timeoutId;
    //   function sequence(arr, idx) {
    //     timeoutId = setTimeout(() => {
    //       observer.next(arr[idx]);
    //       if (idx === arr.length - 1) {
    //         observer.complete();
    //       } else {
    //         sequence(arr, ++idx);
    //       }
    //     }, 1000);
    //   }
    //   sequence(list, 0);

    //   return {
    //     unsubscribe() {
    //       clearTimeout(timeoutId);
    //     }
    //   }
    // });

    /** Using RxJS operators */
    if (Number.isNaN(timeInMillis) || !Number.isFinite(timeInMillis) || !Number.isInteger(timeInMillis)) {
      return throwError('Time in milliseconds is not a valid number');
    }
    const list: number[] = [];
    for (let i = 1; i <= timeInMillis / 1000; i++) { list.push(i); }
    return from(list).pipe(
      // tap(val => console.log(`Spy value: ${val}`)),
      concatMap(val => of(val).pipe(delay(1000)))
    );
  }
}

function* waitForBirthdayWishesSync(timeInMillis: number): IterableIterator<number> {
  const start = Date.now();
  let i = 1;
  while (Date.now() - start <= timeInMillis) {
    if (Date.now() - start === i * 1000) {
      yield i;
      i++;
    }
  }
  return 'Everyone has already wished!';
}