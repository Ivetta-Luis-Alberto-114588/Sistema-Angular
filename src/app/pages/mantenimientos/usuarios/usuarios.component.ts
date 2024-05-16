import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios : number = 0
  public usuarios : Usuario[] = []
  usuariosTmp : Usuario[] = []  //esta variable la uso para cuando no se busque nada va  
  // traer la ultima busqueda
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
          this.usuariosTmp = usuarios  // para guardar en la variable la ultima busqueda
          
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

    if( valor.trim().length === 0 ){
      this.usuarios = this.usuariosTmp  //esto es la ultima busqueda hecha
    }

    this.busquedaService.buscar('usuarios', valor).subscribe(
     data => {
      this.usuarios = data
     }
    )
  }

  eliminarUsuario(usuario : Usuario){
    
    if( usuario.uid === this.usuarioService.uid){
       return Swal.fire({
          title: "No puede borrar usuario",
          text: "No se puede borrar a si mismo",
          icon: "error"
        })    
    }

    return Swal.fire({
      title: "Esta seguro?",
      text: `Va a borrar a ${usuario.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!"
    }).then((result) => {
      if (result.isConfirmed) {
        return this.usuarioService.eliminarUsuario(usuario).toPromise().then(
          resp => {
            Swal.fire({
              title: "Borrado!",
              text: `El usuario ${usuario.nombre} ha sido borrado`,
              icon: "success"
            });
            
            this.cargarUsuarios()
          }
        )       
      } else {
        return Promise.resolve();
      }
    });
}

cambiarRol(usuario: Usuario){
  this.usuarioService.guardarUsuario(usuario).subscribe(
    resp => {
      console.log (resp )
    }
  )
}

}
