import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario
  public imagenSubir! : File

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ){
    this.usuario = this.usuarioService.usuario
  }
    
  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }


  actualizarPerfil(){
    this.usuarioService.actualizarPerfil(this.perfilForm.value).subscribe({
      next: (resp ) => {
        //esto se hizo para no hacer un usuario observable (para mi era mas facil)
        //de la forma que se hizo aca es porque los objetos se pasan por referencia, entonces.. 
        // todo apunta a la referencia y al cambiar el valor .. cambia el valor a todo
        
        /*
          bueno, esta es una mejor explicacion: el servicio es singleton, por lo tanto si yo modifico el 
          usuario, lo modifico en todos lados a la misma instancia, por eso hago
          this.usuario.nombre = nombre
          es decir modifico la instancia de usuario
        */
          const {nombre, email} = this.perfilForm.value
          this.usuario.nombre = nombre
          this.usuario.email = email
  
          Swal.fire('Guardado', 'Acualizacion exitosa', 'success')
      },
      error: (error ) => {
        console.log(error)
        Swal.fire('Error', error.error.msg, 'error')
      }
    })
  }

  cambiarImagen(event : any ){
    this.imagenSubir = event.target.files[0]
        
  }

  subirImagen(){
    this.fileUploadService.actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid!)
      //aca se esta usando otra vez el paso por referencia para que se actualice automaticamente y no usar un observable
      .then ((img) => {        
          Swal.fire('Guardada', 'Foto actualizada', 'success')    
        })
      .catch(error => {
        console.log("desde el catch", error)
        Swal.fire('Error', 'No se pudo subir la imagen', 'error')
      })
  }
      
}


