import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-subject-vs-observable',
  templateUrl: './subject-vs-observable.component.html',
  styleUrls: ['./subject-vs-observable.component.scss']
})
export class SubjectVsObservableComponent implements OnInit {

  private subscriptionList: Subscription[] = [];

  constructor() { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(sub => sub.unsubscribe());
  }

  observableSource(): Observable<number> {
    const obsSource$ = new Observable<number>((observer) => {
      observer.next(Math.random());
    });

    return obsSource$;
  }

  subjectSource(): Subject<number> {
    // Create subject source
    const subSource$ = new Subject<number>();
    // Modify the source by setting random number as data
    subSource$.next(Math.random());

    return subSource$;
  }

  replaySubjectSource(): ReplaySubject<number> {
    // Create subject source
    const replaySubSource$ = new ReplaySubject<number>();
    // Modify the source by setting random number as data
    replaySubSource$.next(Math.random());

    return replaySubSource$;
  }

  behaviorSubjectSource(): BehaviorSubject<number> {
    // Create subject source
    const bahviorSubSource$ = new BehaviorSubject<number>(null);
    // Modify the source by setting random number as data
    bahviorSubSource$.next(Math.random());
    bahviorSubSource$.next(Math.random());
    bahviorSubSource$.next(Math.random());

    return bahviorSubSource$;
  }

  triggerObservable(): void {
    const source$ = this.observableSource();
    let sub = source$
      .subscribe((data: number) => {
        console.log(`Observable subscriber 1 receives: ${data}`);
      });
    this.subscriptionList.push(sub);

    sub = source$
      .subscribe((data: number) => {
        console.log(`Observable subscriber 2 receives: ${data}`);
      });
    this.subscriptionList.push(sub);
  }

  triggerSubject(): void {
    const source$ = this.subjectSource();
    let sub = source$
      .subscribe((data: number) => {
        console.log(`Subject subscriber 1 receives: ${data}`);
      });
    this.subscriptionList.push(sub);

    sub = source$
      .subscribe((data: number) => {
        console.log(`Subject subscriber 2 receives: ${data}`);
      });
    this.subscriptionList.push(sub);

    // Change subject source value
    source$.next(Math.random());
  }

  triggerReplaySubject(): void {
    const source$ = this.replaySubjectSource();
    let sub = source$
      .subscribe((data: number) => {
        console.log(`Replay Subject subscriber 1 receives: ${data}`);
      });
    this.subscriptionList.push(sub);

    sub = source$
      .subscribe((data: number) => {
        console.log(`Replay Subject subscriber 2 receives: ${data}`);
      });
    this.subscriptionList.push(sub);

    // Change subject source value
    source$.next(Math.random());
  }

  triggerBehaviorSubject(): void {
    const source$ = this.behaviorSubjectSource()
    let sub = source$
      .subscribe((data: number) => {
        console.log(`Behavior Subject subscriber 1 receives: ${data}`);
      });
    this.subscriptionList.push(sub);

    sub = source$
      .subscribe((data: number) => {
        console.log(`Behavior Subject subscriber 2 receives: ${data}`);
      });
    this.subscriptionList.push(sub);

    // Change subject source value
    source$.next(Math.random());
  }
}
