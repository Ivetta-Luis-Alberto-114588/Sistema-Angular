import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

//module
import { PageRoutingModule } from './pages/page-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

//components
import { NotPageFoundComponent } from './404/not-page-found/not-page-found.component';

const routes : Routes = [
    // path: "/dashboard" PageRoutingModule
    // path: "/auth" AuthRoutingModule

    {path:"", redirectTo:"dashboard", pathMatch:'full'},
    {path:"**", component: NotPageFoundComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes), PageRoutingModule, AuthRoutingModule],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class AppRoutingModule { }

