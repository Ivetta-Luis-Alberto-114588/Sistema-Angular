import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private usuarioService: UsuarioService,
    private router: Router
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

  buscar(termino: string){    
    console.log(termino)
     
    //esta linea es como que no me anda
    // this.router.navigateByUrl(`/dasbhoard/buscar/${termino}` )
    this.router.navigate(['dashboard','buscar', termino])
    
  }

}
