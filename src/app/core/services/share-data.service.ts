import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private dataSource = new BehaviorSubject<any>({});
  private currentData = this.dataSource.asObservable();

  constructor() { }

  sendData(data: any): void {
    this.dataSource.next(data);
  }

  getData(): Observable<any> {
    return this.currentData;
  }
}
