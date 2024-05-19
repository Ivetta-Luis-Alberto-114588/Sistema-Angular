import { Component } from '@angular/core';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent {

  
  constructor(public modalService : ModalImagenService){

  }

  cerrarModal() {
    this.modalService.cerrarModal()
  }


}
