import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShareDataService } from '../services/share-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private shareData: ShareDataService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const unsubscribe$ = new Subject<void>();
      this.shareData.getData()
        .pipe(takeUntil(unsubscribe$))
        .subscribe((data: any) => {
          unsubscribe$.next();
          unsubscribe$.complete();

          if (!!data.isLoggedIn) {
            resolve(true);
          } else {
            this.router.navigate(['']);
            resolve(false);
          }
        });
    });
  }
}
