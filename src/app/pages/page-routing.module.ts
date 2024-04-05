import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { PagesComponent } from './pages.component';
import { DashoboardComponent } from './dashoboard/dashoboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
    {path:"dashboard", 
    component: PagesComponent, 
    children:[
        {path: "", component: DashoboardComponent, data:{titulo:'Dasboard'}},
        {path: 'grafica1', component: Grafica1Component,data: {titulo: 'Grafica'} },
        {path: "progress", component: ProgressComponent, data: {titulo: 'Progress'}},
        {path: "promesas", component: PromesasComponent, data: {titulo: 'Promesas'}},
        {path: "rxjs", component: RxjsComponent, data : {titulo: 'Rxjs'}},
    ]}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule {}
