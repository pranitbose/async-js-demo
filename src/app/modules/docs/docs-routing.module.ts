import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DependencyInjectionComponent } from './dependency-injection/dependency-injection.component';
import { DocsComponent } from './docs.component';
import { ObservableRxjsComponent } from './observable-rxjs/observable-rxjs.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SubjectVsObservableComponent } from './subject-vs-observable/subject-vs-observable.component';
import { SyncVsAsyncComponent } from './sync-vs-async/sync-vs-async.component';

const routes: Routes = [
  { path: '', 
    component: DocsComponent,
    children: [
      { path: '', component: SyncVsAsyncComponent },
      { path: 'observable-rxjs', component: ObservableRxjsComponent },
      { path: 'subject-observable', component: SubjectVsObservableComponent },
      { path: 'dependency-injection', component: DependencyInjectionComponent },
      { path: 'product-list', component: ProductListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
