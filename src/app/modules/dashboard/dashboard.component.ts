import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post } from '../../core/models/app-model';
import { ApiService } from '../../core/services/api.service';
import { ShareDataService } from '../../core/services/share-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  name: string = '';
  posts: Post[] = [];
  postsFetched = false;
  
  private userID: number;
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
        this.postsFetched = true;
      });
  }

  fetchSharedData(): void {
    this.shareData.getData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        const { id = NaN, name = '' } = data.user || {};
        this.userID = id;
        this.name = name;
        this.fetchPosts();
      });
  }
}
