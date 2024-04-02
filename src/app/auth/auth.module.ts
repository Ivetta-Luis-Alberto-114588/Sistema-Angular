import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
    declarations: [RegisterComponent, LoginComponent],
    imports: [RouterModule, FormsModule],
    exports: [RegisterComponent, LoginComponent],
    providers: [],
})
export class AuthModule { }
