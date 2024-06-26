import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

//modules
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

//components
import { ProgressComponent } from './progress/progress.component';
import { DashoboardComponent } from './dashoboard/dashoboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { CommonModule } from '@angular/common';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




@NgModule({
    imports: [RouterModule, SharedModule, ComponentsModule, ReactiveFormsModule, CommonModule, FormsModule, PipesModule],
    exports: [RouterModule],
    declarations: [
      DashoboardComponent,
      ProgressComponent,
      Grafica1Component,
      PagesComponent,
      PromesasComponent,
      RxjsComponent,
      PerfilComponent,
      UsuariosComponent,
      HospitalesComponent,
      MedicosComponent,
      MedicoComponent,
      BusquedaComponent,
      
  ],
    providers: [],
})
export class PageModule { }

