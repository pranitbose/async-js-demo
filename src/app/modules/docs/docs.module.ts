import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DependencyInjectionModule } from './dependency-injection/dependency-injection.module';
import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { ObservableRxjsComponent } from './observable-rxjs/observable-rxjs.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { SubjectVsObservableComponent } from './subject-vs-observable/subject-vs-observable.component';
import { SyncVsAsyncComponent } from './sync-vs-async/sync-vs-async.component';

@NgModule({
  declarations: [
    DocsComponent,
    SyncVsAsyncComponent,
    ObservableRxjsComponent,
    SubjectVsObservableComponent,
    ProductListComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    DocsRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    DependencyInjectionModule,
  ]
})
export class DocsModule { }
