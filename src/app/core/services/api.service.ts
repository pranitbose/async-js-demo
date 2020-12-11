import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { APOD, Post, User } from '../models/app-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private BASE_URL = 'https://jsonplaceholder.typicode.com'

  constructor(
    private http: HttpClient,
    private matSnackBar: MatSnackBar
  ) { }

  getAPOD(): Observable<APOD> {
    return this.http.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .pipe(
        map(res => {
          if (res && 'title' in res && 'url' in res && 'explanation' in res) {
            const { title, url, explanation } = res;
            return {
              title,
              imgUrl: url,
              explanation
            }
          } else {
            throw new Error();
          }
        }),
        catchError(err => {
          return of({
            title: '',
            imgUrl: 'https://api.nasa.gov/assets/img/general/apod.jpg',
            explanation: ''
          });
        })
      );
  }

  getUsers(): Observable<User[]> {
    return this.http.get(`${this.BASE_URL}/users`)
      .pipe(
        map((res: any) => {
          if (res && res instanceof Array && res.length) {
            const users:  Array<User> = [];
            res.forEach((user: any) => {
              const { id, name, username, email } = user;
              users.push({
                id: +id,
                name: name || '',
                username: username || '',
                email: email || ''
              })
            });
            return users;
          } else {
            throw new Error();
          }
        }),
        catchError(err => {
          this.showErrorSnackBar('No user details found!');
          return of([]);
        })
      );
  }

  getPostsByUserId(userID: number): Observable<Post[]> {
    const imgBaseURL = 'https://placeimg.com/200/200/nature';
    return this.http.get(`${this.BASE_URL}/posts?userId=${userID}`)
      .pipe(
        map((res: any) => {
          if (res && res instanceof Array && res.length) {
            const posts:  Array<Post> = [];
            res.forEach((post: any, index: number) => {
              const { id, title, body } = post;
              posts.push({
                id: +id,
                title: title || '',
                body: body || '',
                imgURL: `${imgBaseURL}/${index + 1}` || ''
              })
            });
            return posts;
          } else {
            throw new Error();
          }
        }),
        catchError(err => {
          this.showErrorSnackBar('No posts found for this user!');
          return of([]);
        })
      );
  }

  private showErrorSnackBar(message: string, action: string = 'OK'): void {
    this.matSnackBar.open(message, action, {
      duration: 3000
    });
  }
}
