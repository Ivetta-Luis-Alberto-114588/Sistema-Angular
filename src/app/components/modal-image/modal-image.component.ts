import { Component } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { FileUploadService } from "src/app/services/file-upload.service"
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent {

  public imagenSubir!: File;
  public imgTmp: any = null;
  
  constructor(public modalService : ModalImagenService, private fileUploadService : FileUploadService ){

  }

  cerrarModal() {
    this.imgTmp = null
    this.modalService.cerrarModal()
  }

  cambiarImagen (file : File){
    this.imagenSubir = file

    if( !file ){
      this.imgTmp = null
    }

    const reader = new FileReader();
    reader.readAsDataURL( file)

    reader.onloadend = () => {
      this.imgTmp = reader.result
    }
    
  }

  subirImagen(){

    const id = this.modalService.id
    const tipo = this.modalService.tipo

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo!, id!)
      //aca se esta usando otra vez el paso por referencia para que se actualice automaticamente y no usar un observable
      .then ((img) => {        
          Swal.fire('Guardada', 'Foto actualizada', 'success') 

          this.modalService.nuevaImagen.emit(img)

          this.cerrarModal()   
        })
      .catch(error => {
        console.log("desde el catch", error)
        Swal.fire('Error', 'No se pudo subir la imagen', 'error')
      })
  }


}
