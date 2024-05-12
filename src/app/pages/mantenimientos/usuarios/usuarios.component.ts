import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios : number = 0
  usuarios : Usuario[] = []
  public desde : number = 0
  public cargando: boolean = true

  constructor( private usuarioService: UsuarioService, private busquedaService: BusquedasService){}
  
  
  ngOnInit(): void {

    this.cargarUsuarios()
    
  }

  cargarUsuarios(){
    
    //hago que se muestre el looding
    this.cargando = true

    this.usuarioService.cargarUsuarios( this.desde ).subscribe(
      ( {total, usuarios} ) => {
        this.totalUsuarios = total
          this.usuarios = usuarios
          
          //hago que no se muestre el loading
          this.cargando = false     
      } 
      )
  }

  cambiarPagina (valor : number){
    
    this.desde += valor

    if( this.desde < 0){
      this.desde = 0
    } else if ( this.desde >= this.totalUsuarios){
      this.desde -= valor
    }

    //para que cuando se ejecute el cambiar pagina, se vuelve a llamar la peticion con el nuevo valor desde
    this.cargarUsuarios()
  }

  buscar(valor: string){
    this.busquedaService.buscar('usuarios', valor).subscribe(
     data => {
      this.usuarios = data
     }
    )
  }


}
