import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http"
import { CommonModule } from '@angular/common';

//components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
    declarations: [RegisterComponent, LoginComponent],
    imports: [RouterModule, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
    exports: [RegisterComponent, LoginComponent],
    providers: [],
})
export class AuthModule { }
