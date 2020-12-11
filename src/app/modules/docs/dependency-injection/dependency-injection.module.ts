import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { DependencyInjectionComponent } from './dependency-injection.component';
import { ModuleThemeService } from './module-theme.service';
import { TestDiOneComponent } from './test-di-one/test-di-one.component';
import { TestDiTwoComponent } from './test-di-two/test-di-two.component';

@NgModule({
    declarations: [
        DependencyInjectionComponent,
        TestDiOneComponent,
        TestDiTwoComponent
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        MatGridListModule,
        MatButtonModule,
    ],
    exports: [
        DependencyInjectionComponent,
        TestDiOneComponent,
        TestDiTwoComponent
    ],
    providers: [
        ModuleThemeService
    ]
})
export class DependencyInjectionModule { }