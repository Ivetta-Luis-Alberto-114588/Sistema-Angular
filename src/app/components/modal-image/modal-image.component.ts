import { Component } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent {

  public imagenSubir!: File;
  public imgTmp: any = null;
  
  constructor(public modalService : ModalImagenService){

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


}
