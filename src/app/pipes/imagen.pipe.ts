import { Pipe, PipeTransform } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';

const base_url  = enviroment.base_url

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: "usuarios" | "medicos" | "hospitales"): string {
    
    if (!img){
      return `${base_url}/upload/${tipo}/no-image`
  }

  //aca estoy viendo de poner la imagen de google
  if(img?.includes('https')){
          return img
  }

  // si la imagen no es nula, armo toda la direccion para devolverra
  if( img ){
      const url = `${base_url}/upload/${tipo}/${img}`
      return url

      //si no hay ninguna imagen devuelvo un nombre de imagen que no existe para que no ponga nada
  } else {
      
      return `${base_url}/upload/${tipo}/no-image`
      // return 'no-image'
  }
  }

}
