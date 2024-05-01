import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario! : Usuario

  constructor(
    private usuarioService: UsuarioService
  ){ 
    //hago esto para obtener el usuario en el constructor que es lo que primero se inicializa
    this.usuario = this.usuarioService.usuario
   }


  ngOnInit(): void {
    this.usuarioService.validarToken()
  }

  logout(){
    this.usuarioService.logout()
  }

}
