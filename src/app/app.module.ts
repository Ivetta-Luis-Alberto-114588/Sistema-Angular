import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//module
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { PageModule } from './pages/page.module';


//components
import { AppComponent } from './app.component';
import { NotPageFoundComponent } from './404/not-page-found/not-page-found.component';


@NgModule({
  declarations: [
    AppComponent,
    NotPageFoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
