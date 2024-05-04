import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  base_url = enviroment.base_url

  constructor( ) { }

  //no se va a usar el http, solo fetch de js
  async actualizarFoto(
    archivo : File,
    tipo : 'usuarios' | 'hospitales' | 'medicos',
    uid: string
  ){
    
    try {

      const url = `${ this.base_url}/upload/${ tipo }/${ uid }`
      
      //FormData sirve para construir clave:valor para enviar a una request
      const formData = new FormData();
      formData.append('imagen',archivo)

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        }, 
        body: formData
      });

      const data = await resp.json() 

      if( data ){
        return data.nombreArchivo
      } else {
        console.log(data.msg)
        return false
      }
      
    } catch (error) {
      
      console.log(error)
      return false
    }
  }

}
