import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { pipe, map } from 'rxjs';

const base_url = enviroment.base_url


@Injectable({
  providedIn: 'root'
})
export class BusquedasService {


  constructor( private http: HttpClient) { }

  get token() : string {
    //obtengo el token del localstorage
   return localStorage.getItem('token') || ''
 }

 
  get headers(){
    return {
      headers: {
      'x-token': this.token
      }
    }
  }
    
  buscar( tipo: 'usuarios' | 'hospitales' | 'medicos',  termino: string = ''){


    const url = `${base_url}/todo/coleccion/${ tipo }/${ termino }`
 
    return this.http.get<any[]>( url , this.headers)
      .pipe(
        map( (resp : any) => resp.resultado)
      )
  }

}
