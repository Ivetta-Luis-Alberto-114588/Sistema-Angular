import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroment';
import { Medico } from '../models/medico.model';



@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  base_url = enviroment.base_url


  constructor( private http : HttpClient,) { }

  get token() : string {
    //obtengo el token del localstorage
   return localStorage.getItem('token') || ''
 }


  get headers(){
    return {
      headers: { 
      'x-token': this.token
      }
    } as const;
  }

  getMedicos(){
    return this.http.get<{ok: boolean, medicos: Medico[]}>(`${this.base_url}/medicos`, this.headers)
      .pipe(
        map( (resp) => resp.medicos)
      )
  }

  crearMedico(medico: Medico){

    const url = `${this.base_url}/medicos`
  
    return this.http.post( url , medico, this.headers) 
  }

  
  actualizarMedico( medico: Medico){

    const url = `${this.base_url}/medicos/${medico._id}`
    
    return this.http.put( url ,medico, this.headers) 
  }

  borrarMedico( _id: string){

    const url = `${this.base_url}/medicos/${_id}`
    
    return this.http.delete( url, this.headers) 
  }

}
