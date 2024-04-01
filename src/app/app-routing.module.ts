import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotPageFoundComponent } from './404/not-page-found/not-page-found.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PageRoutingModule } from './pages/page-routing.module';
import { PagesComponent } from './pages/pages.component';
import { DashoboardComponent } from './pages/dashoboard/dashoboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { ProgressComponent } from './pages/progress/progress.component';


const routes : Routes = [

    {path:"", 
        component: PagesComponent, 
        children:[
            {path: "dashboard", component: DashoboardComponent},
            {path: 'grafica1', component: Grafica1Component },
            {path: "progress", component: ProgressComponent},
            {path: "", redirectTo:"dashboard", pathMatch: "prefix"}, 
    ]},

    {path: "login", component:LoginComponent},
    {path: "register", component: RegisterComponent},

    {path:"**", component: NotPageFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes), PageRoutingModule],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }
