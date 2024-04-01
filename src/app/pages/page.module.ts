import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


import { SharedModule } from '../shared/shared.module';


import { ProgressComponent } from './progress/progress.component';
import { DashoboardComponent } from './dashoboard/dashoboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';




@NgModule({
    imports: [RouterModule, SharedModule],
    exports: [RouterModule],
    declarations: [
      DashoboardComponent,
      ProgressComponent,
      Grafica1Component,
      PagesComponent
  ],
    providers: [],
})
export class PageModule { }

