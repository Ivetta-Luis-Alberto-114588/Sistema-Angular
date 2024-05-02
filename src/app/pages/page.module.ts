import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

//modules
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

//components
import { ProgressComponent } from './progress/progress.component';
import { DashoboardComponent } from './dashoboard/dashoboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
    imports: [RouterModule, SharedModule, ComponentsModule, ReactiveFormsModule],
    exports: [RouterModule],
    declarations: [
      DashoboardComponent,
      ProgressComponent,
      Grafica1Component,
      PagesComponent,
      PromesasComponent,
      RxjsComponent,
      PerfilComponent,
      
  ],
    providers: [],
})
export class PageModule { }

