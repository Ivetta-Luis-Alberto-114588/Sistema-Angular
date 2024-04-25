import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerFormInterface } from '../interfaces/registerForm.interface';
import { enviroment } from 'src/enviroments/enviroment';



@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  
  base_url = enviroment.base_url ;

  constructor(private http : HttpClient) { }


  crearUsuario(formdata: registerFormInterface){

    console.log("creando usuario")
      
    return this.http.post(`${this.base_url }/usuarios`, formdata)
  }


}
