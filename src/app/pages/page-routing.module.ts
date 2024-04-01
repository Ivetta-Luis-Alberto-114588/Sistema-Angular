import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { PagesComponent } from './pages.component';
import { DashoboardComponent } from './dashoboard/dashoboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';


const routes: Routes = [
    {path:"dashboard", 
    component: PagesComponent, 
    children:[
        {path: "", component: DashoboardComponent},
        {path: 'grafica1', component: Grafica1Component },
        {path: "progress", component: ProgressComponent}
    ]}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule {}
