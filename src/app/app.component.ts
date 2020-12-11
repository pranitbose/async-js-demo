import { Component, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShareDataService } from './core/services/share-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private shareData: ShareDataService
  ) { }

  ngOnInit(): void {
    // Retreive saved shared data state from LocalStorage on page init or reload
    const data: any = localStorage.getItem('data') || null;
    if (data) {
      this.shareData.sendData(JSON.parse(atob(data)));
    }
  }

  @HostListener('window:beforeunload')
  saveSharedDataState(): void {
    const unsubscribe$ = new Subject<void>();
    this.shareData.getData()
      .pipe(takeUntil(unsubscribe$))
      .subscribe(data => {
        // Dump current shared data state in LocalStorage
        localStorage.setItem('data', btoa(JSON.stringify(data)));
        // Unsubscribe to stop listening and to avoid side-effects
        unsubscribe$.next();
        unsubscribe$.complete();
      });
  }
}
