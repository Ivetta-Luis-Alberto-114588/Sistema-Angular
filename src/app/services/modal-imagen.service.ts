import { EventEmitter, Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

const base_url = enviroment.base_url

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal: boolean = true;
  public tipo? : 'usuarios' | 'hospitales' | 'medicos'
  public id? : string
  public img? : string 

  public nuevaImagen : EventEmitter<string> = new EventEmitter<string>()


  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  abrirModal( tipo: 'usuarios' | 'hospitales' | 'medicos', id?: string, img : string = 'no_disponible.jpg')  {
    this._ocultarModal = false
    
    this.tipo = tipo
    this.id = id

    // localhost:3000/api/upload/usuarios/869a15e7-29d7-408e-93c8-a9baf0a54c2d.jpg
    if ( img?.includes('https')){
      this.img = img
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`
    }

    // this.img = img
  }

  cerrarModal() {
    this._ocultarModal = true;
  }

  constructor() { }
}
