import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShareDataService } from '../../core/services/share-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showLogoutBtn: boolean;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private shareData: ShareDataService
  ) { }

  ngOnInit(): void {
    this.fetchSharedData();
  }

  logout(): void {
    localStorage.clear();
    // Unsubscribe first to avoid triggering the subscription here
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.shareData.sendData({});
    this.router.navigate(['']);
  }

  fetchSharedData(): void {
    this.shareData.getData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.showLogoutBtn = !!data.isLoggedIn;
      });
  }
}
