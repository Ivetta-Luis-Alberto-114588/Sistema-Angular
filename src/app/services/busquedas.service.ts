import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { pipe, map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { Hospital } from '../models/hospital.model';

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

  private transformarUsuarios( resultados : any[]) : Usuario[] {

    return resultados.map(
      user => new Usuario (user.nombre, user.email, user.password, user.obtenerImagenUrl, user.google, user.role, user.uid)
    )
  }

  private transformarHospitales( resultados : any[]) : Hospital[] {

    return resultados.map(
      data => new Hospital (data.nombre, data.img)
    )
  }

  buscarGlobal( termino : string){
    // localhost:3000/api/todo/xxx
    return this.http.get(`${base_url}/todo/${termino}`, this.headers)
    
  }

    
  buscar( tipo: 'usuarios' | 'hospitales' | 'medicos',  termino: string = ''){


    const url = `${base_url}/todo/coleccion/${ tipo }/${ termino }`
 
    return this.http.get<any[]>( url , this.headers)
      .pipe(
        map( (resp : any) => {
          switch ( tipo ) {
            case 'usuarios':
              return this.transformarUsuarios( resp.resultado )

              case 'hospitales':
              return this.transformarHospitales( resp.resultado )

              case 'medicos':
              return this.transformarUsuarios( resp.resultado )

            default:
              return []
          }
        })
      )
  }

}
