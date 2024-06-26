import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components

import { DashoboardComponent } from './dashoboard/dashoboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

//mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { adminGuard } from '../guards/admin.guard';

const childRoutes : Routes = [
  
  {path: "", component: DashoboardComponent, data:{titulo:'Dasboard'}},
  {path: "perfil", component: PerfilComponent, data : {titulo: 'Perfil'}},
  {path: "buscar/:termino", component: BusquedaComponent, data : {titulo: 'Busquedas'}},
  {path: 'grafica1', component: Grafica1Component,data: {titulo: 'Grafica'} },
  {path: "progress", component: ProgressComponent, data: {titulo: 'Progress'}},
  {path: "promesas", component: PromesasComponent, data: {titulo: 'Promesas'}},
  {path: "rxjs", component: RxjsComponent, data : {titulo: 'Rxjs'}},



  // manteminientos
  {path: "hospitales", component: HospitalesComponent, data : {titulo: 'Hospitales'}},
  {path: "medicos", component: MedicosComponent, data : {titulo: 'Medicos'}},
  {path: "medico/:id", component: MedicoComponent, data : {titulo: 'Medico'}},

  //rutas de admin
  {path: "usuarios", canActivate:[adminGuard],  component: UsuariosComponent, data : {titulo: 'Usuarios de aplicacion'}},

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
