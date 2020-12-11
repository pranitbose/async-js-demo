import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post } from 'src/app/core/models/app-model';
import { ApiService } from 'src/app/core/services/api.service';
import { ShareDataService } from 'src/app/core/services/share-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userID: number = NaN;
  username: string = '';
  posts: Post[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private shareData: ShareDataService
  ) { }

  ngOnInit(): void {
    this.fetchSharedData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fetchPosts(): void {
    this.apiService.getPostsByUserId(this.userID)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((posts: Array<Post>) => {
        this.posts = posts;
      });
  }

  fetchSharedData(): void {
    this.shareData.getData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        console.log(data);
        const { id = NaN, username = '' } = data.user;
        this.userID = id;
        this.username = username;
        this.fetchPosts();
      });
  }
}
