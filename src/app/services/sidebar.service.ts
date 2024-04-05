import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {titulo: 'Principal',
    icono: 'mdi mdi-gauge',
    submenu: [
      {titulo: 'main', url: '/'},
      {titulo: 'progressBar', url: 'progress'},
      {titulo: 'graficas', url: 'grafica1'},
      {titulo: 'promesas', url:'promesas'},
      {titulo: 'rxjs', url:'rxjs'}
    ]  
    },
    {titulo: 'Secundaria',
    icono: 'mdi mdi-account-circle',
    submenu: [
      {titulo: 'main', url: '/'},
      {titulo: 'progressBar', url: 'progress'},
      {titulo: 'graficas', url: 'grafica1'}
   
    ]  
    },

  ]

  constructor() { }
}
