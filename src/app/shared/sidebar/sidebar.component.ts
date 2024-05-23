import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  // menu: any[] = []
  usuario! : Usuario

  constructor(
    public sidebarService: SidebarService, 
    private usuarioService: UsuarioService)
    {
    // this.menu = sidebar.menu;
     //hago esto para cuando se inicialice el componente cargue la imagen, esto va a al html 
    //  this.menu = this.sidebarService.menu
     this.usuario = this.usuarioService.usuario
  }
  
  
  ngOnInit(): void {
   
  }

}
