import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerFormInterface } from '../interfaces/registerForm.interface';
import { enviroment } from 'src/enviroments/enviroment';
import { loginFormInterface } from '../interfaces/loginForm.interface';
import { Observable, tap, pipe, map, catchError, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  
  base_url = enviroment.base_url ;

  constructor(private http : HttpClient) { }

validarToken(): Observable<boolean>{
  
  //obtengo el token del localstorage
  const token = localStorage.getItem('token') || ''
  
  //hago un renvovar token con el token guardado en el localstorage
  // armo el header para enviar el x-token que defini en postman
  return this.http.get(`${this.base_url}/login/renew`, {
    headers: {
      'x-token': token}
  }).pipe(
    tap( (resp: any) => {
      localStorage.setItem('token', resp.token)
    }),
    map( resp => true),
    //aca lo que hago es si hay un error devuelvo un observable false y en el guard lo redirecciona
    // al /login
    catchError( error => of (false))
  )
}


  crearUsuario(formdata: registerFormInterface){

    console.log("creando usuario")
      
    return this.http.post(`${this.base_url }/usuarios`, formdata)
        //tambien puedo guardar el token en el componente cuando se ejecuta la funcion next
        .pipe(
          tap( (resp : any) =>{
            localStorage.setItem('token', resp.token)
          })
        )
  }


  login(loginForm: loginFormInterface){

    return this.http.post(`${ this.base_url }/login`, loginForm)
    //tambien puedo guardar el token en el componente cuando se ejecuta la funcion next
                .pipe(
                  tap( (resp : any) =>{
                    localStorage.setItem('token', resp.token)
                  })
                )

  }

  loginGoogle( token: string ) {
    return this.http.post( `${this.base_url}/login/google`, { token } )
          .pipe(
            tap( (resp : any) =>{
              console.log(resp)
              localStorage.setItem('token', resp.token)
            })
          )
  }


}
