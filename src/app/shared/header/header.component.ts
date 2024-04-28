import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  imagenUrl : string =  ''

  constructor(
    private usuarioService: UsuarioService
  ){ 
    //hago esto para cuando se inicialice el componente cargue la imagen, esto va a al html 
    this.imagenUrl = this.usuarioService.usuario.obtenerImagenUrl
   }

  logout(){
    this.usuarioService.logout()
  }

}
