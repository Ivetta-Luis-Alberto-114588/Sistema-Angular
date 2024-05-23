import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = []

  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!) || []
  }

  // menu: any[] = [
  //   {titulo: 'Principal',
  //   icono: 'mdi mdi-gauge',
  //   submenu: [
  //     {titulo: 'main', url: '/'},
  //     {titulo: 'progressBar', url: 'progress'},
  //     {titulo: 'graficas', url: 'grafica1'},
  //     {titulo: 'promesas', url:'promesas'},
  //     {titulo: 'rxjs', url:'rxjs'}
  //   ]  
  //   },
  //   {titulo: 'Mantenimiento',
  //   icono: 'mdi mdi-folder-lock-open',
  //   submenu: [
  //     {titulo: 'Usuarios', url: 'usuarios'},
  //     {titulo: 'Hospitales', url: 'hospitales'},
  //     {titulo: 'Medicos', url: 'medicos'}
   
  //   ]  
  //   },

  // ]

  constructor() { }
}
