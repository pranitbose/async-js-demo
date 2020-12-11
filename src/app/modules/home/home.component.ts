import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { APOD } from '../../core/models/app-model';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  apod: APOD;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apod = {
      title: '',
      imgUrl: 'https://api.nasa.gov/assets/img/general/apod.jpg',
      explanation: ''
    }
    this.fetchAPOD();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  fetchAPOD(): void {
    this.apiService.getAPOD()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((apod: APOD) => this.apod = apod);
  }
}
