import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ObservablesService } from './observables.service';

@Component({
  selector: 'app-observable-rxjs',
  templateUrl: './observable-rxjs.component.html',
  styleUrls: ['./observable-rxjs.component.scss'],
  providers: [ObservablesService]
})
export class ObservableRxjsComponent implements OnInit {

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private observableService: ObservablesService
  ) { }

  ngOnInit(): void { }

  ngOnDestroy() {
    /** Unsubscribe the observers by marking the Subject source as complete */
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  triggerColdObservable(): void {
    console.log('COLD OBSERVABLE');
    this.observableService.coldObservableSource()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(x => console.log('sub 1: ', x));

    setTimeout(() => {
      this.observableService.coldObservableSource()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(x => console.log('                sub 2: ', x));
    }, 2700);
  }

  triggerHotObservable(): void {
    console.log('HOT OBSERVABLE');
    const source$ = this.observableService.hotObservableSource();
    source$.connect(); // Source will not emit values until connect() is called
    setTimeout(() => {
      source$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(x => console.log('sub 1: ', x));
    }, 2700);

    setTimeout(() => {
      source$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(x => console.log('                sub 2: ', x));
    }, 3700);
  }

  triggerLazyLoadedHotObservable(): void {
    console.log('LAZY LOADED HOT OBSERVABLE');
    const source$ = this.observableService.lazyLoadedHotObservableSource();
    setTimeout(() => {
      source$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(x => console.log('sub 1: ', x));
    }, 2700);

    setTimeout(() => {
      source$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(x => console.log('                sub 2: ', x));
    }, 4100);
  }

  triggerMapAndFlatMapOps(): void {
    this.observableService.mapSource()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => console.log('Map Source Value: ', val));
    this.observableService.flatMapSource()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => console.log('Flat-Map Source Value: ', val));
  }

  triggerRequestTimeoutSimulation(): void {
    this.observableService.timeoutExampleSource()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => console.log(res));
  }
}
