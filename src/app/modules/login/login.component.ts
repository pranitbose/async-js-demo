import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../core/models/app-model';
import { ApiService } from '../../core/services/api.service';
import { ShareDataService } from '../../core/services/share-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  users: Array<User> = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private apiService: ApiService,
    private shareData: ShareDataService
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  login(userID: number): void {
    const user = this.users.filter(user => user.id === userID)[0];
    if (!user) { // User not selected
      alert('Please select a user to continue!');
      return;
    }
    // Route to dashboard
    const data = { user, isLoggedIn: true };
    this.shareData.sendData(data);
    localStorage.setItem('user', btoa(JSON.stringify(user)));
    this.router.navigateByUrl('/dashboard');
  }

  fetchUsers(): void {
    this.apiService.getUsers()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((users: Array<User>) => this.users = users);
  }
}
