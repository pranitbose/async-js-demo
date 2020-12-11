import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
    const data: any = localStorage.getItem('data') || null;
    if (data) {
      this.shareData.sendData(JSON.parse(atob(data)));
    }
  }

  @HostListener('window:beforeunload')
  saveSharedDataState(): void {
    const subscription: Subscription = this.shareData.getData()
      .subscribe(data => {
        localStorage.setItem('data', btoa(JSON.stringify(data)));
        subscription && subscription.unsubscribe();
      });
  }
}
