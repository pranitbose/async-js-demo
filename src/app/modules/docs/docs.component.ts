import { Component } from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss']
})
export class DocsComponent {

  modules = [
    {
      title: 'Synchronous vs Asynchronous',
      url: '/docs'
    },
    {
      title: 'Observables & RxJS',
      url: 'observable-rxjs'
    },
    {
      title: 'Subject vs Observable',
      url: 'subject-observable'
    },
    {
      title: 'Dependency Injection',
      url: 'dependency-injection'
    },
    {
      title: 'Nested Components',
      url: 'product-list'
    },
    {
      title: 'HTTP Client',
      url: 'http-client'
    },
  ]
}
