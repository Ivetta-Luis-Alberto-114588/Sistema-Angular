import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { enviroment } from 'src/enviroments/enviroment';
import { Hospital } from '../models/hospital.model';



@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  base_url = enviroment.base_url ;

  constructor(private http : HttpClient) { }

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

 cargarHospitales(){

  const url = `${this.base_url}/hospitales`
  
  return this.http.get<{ok: boolean, hospitales: Hospital[]}>( url , this.headers)
    .pipe(
      map( (resp : {ok: boolean, hospitales: Hospital[]}) => resp.hospitales )
    )
   
        
}

}
