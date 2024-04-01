import { NgModule } from '@angular/core';

//components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


@NgModule({
    declarations: [RegisterComponent, LoginComponent],
    imports: [],
    exports: [RegisterComponent, LoginComponent],
    providers: [],
})
export class AuthModule { }
